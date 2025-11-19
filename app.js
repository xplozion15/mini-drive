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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadFile } = require("./utils/supabaseUpload");

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
  "/profile/",
  upload.single("avatar"),
  async function (req, res, next) {
    
    

    const parentFolderId = null;
    const file = req.file;
    console.log(file);
    
    const MAX_FILE_SIZE = 6291456;

    if(file.size > MAX_FILE_SIZE) {
       return res.status(400).send({ error: 'Something failed/file too large(6mb max)' })
    }

    const uploadedFile = await uploadFile(file, req.user.id, parentFolderId);
    const uploadedFilePath = uploadedFile.path;

    // Check if file already exists in same folder
    const existingFile = await prisma.file.findFirst({
      where: {
        name: file.originalname,
        folderId: parentFolderId,
      },
    });

    // update if file already exists and create one if it doesnt
    if (existingFile) {
      await prisma.file.update({
        where: {
          id: existingFile.id,
        },
        data: {
          name: file.originalname,
          path: uploadedFilePath,
          size: file.size,
          fileType: file.mimetype,
        },
      });
    } else {
      await prisma.file.create({
        data: {
          name: file.originalname,
          folderId: parentFolderId,
          path: uploadedFilePath,
          size: file.size,
          fileType: file.mimetype,
          userId : req.user.id,
        },
      });
    }
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.redirect(`/drive`); //refresh the same page//
  }
);


app.post(
  "/profile/:parentFolderId",
  upload.single("avatar"),
  async function (req, res, next) {
    

    const parentFolderId = Number(req.params.parentFolderId);
    const file = req.file;
    console.log(file);

    const MAX_FILE_SIZE = 6291456;
    
    if(file.size > MAX_FILE_SIZE) {
       return res.status(400).send({ error: 'Something failed/file too large(6mb max)' })
    }

    const uploadedFile = await uploadFile(file, req.user.id, parentFolderId);
    const uploadedFilePath = uploadedFile.path;

    // Check if file already exists in same folder
    const existingFile = await prisma.file.findFirst({
      where: {
        name: file.originalname,
        folderId: parentFolderId,
      },
    });

    // update if file already exists and create one if it doesnt
    if (existingFile) {
      await prisma.file.update({
        where: {
          id: existingFile.id,
        },
        data: {
          name: file.originalname,
          path: uploadedFilePath,
          size: file.size,
          fileType: file.mimetype,
        },
      });
    } else {
      await prisma.file.create({
        data: {
          name: file.originalname,
          folderId: parentFolderId,
          path: uploadedFilePath,
          size: file.size,
          fileType: file.mimetype,
          userId : req.user.id
        },
      });
    }
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.redirect(`/drive/${parentFolderId}`); //refresh the same page//
  }
);



// //upload middleware
// const uploadMiddleware = upload.fields([
//   { name: "avatar", maxCount: 1 },
// ]);



// 404 error route
app.use((req, res, next) => {
  res.status(404).send("error 404 this url doesnt exist in mini drive app");
});


//listener 
app.listen(port, () => {
  console.log(`Welcome to mini drive express app ${port}`);
});
