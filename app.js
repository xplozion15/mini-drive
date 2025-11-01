require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const path = require("node:path");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const { indexRouter } = require("./routes/indexRouter");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { driveRouter } = require("./routes/driveRouter");
const prisma = new PrismaClient();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await prisma.user.upsert({
          where: { googleId: profile.id },
          update: {},
          create: { googleId: profile.id, name: profile.name.givenName },
        });
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// app.js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/drive", driveRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

app.post(
  "/profile/:parentFolderId",
  upload.single("avatar"),
  async function (req, res, next) {
    const parentFolderId = Number(req.params.parentFolderId);
    const file = req.file;
    console.log(file);

    await prisma.file.create({
      data: {
        name: file.originalname,
        folderId: parentFolderId,
        path: file.path,
        size: file.size,
        fileType: file.mimetype,
      },
    });

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.redirect(`/drive/${parentFolderId}`); //refresh the same page//
  },
);

app.post(
  "/photos/upload",
  upload.array("photos", 12),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    res.redirect("/");
  },
);

const uploadMiddleware = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);
app.post("/cool-profile", uploadMiddleware, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

app.listen(port, () => {
  console.log(`Welcome to mini drive express app ${port}`);
});
