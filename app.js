require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const path = require("node:path");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const {indexRouter} = require("./routes/indexRouter")

var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const prisma = new PrismaClient();

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

// var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await prisma.users.upsert({
          where: { googleId: profile.id },
          update: {},
          create: { googleId: profile.id },
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
    const user = await prisma.users.findUnique({ where: { id } });
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


app.use("/", indexRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.listen(port, () => {
  console.log(`Welcome to mini drive express app ${port}`);
});
