if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");

const listingsRoutes = require("./routes/listing");
const reviewsRoutes = require("./routes/review");
const UserRoutes = require("./routes/user");

const dbUrl = process.env.DB_URL;

// Fail fast with a clear message if the DB connection string is missing.
// (On Render this must be set under Dashboard -> Environment.)
if (!dbUrl) {
  console.error(
    "FATAL: DB_URL environment variable is not set. Set it on Render to your MongoDB Atlas connection string."
  );
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const store = new mongoStore({
  mongoUrl: dbUrl,
  ...(process.env.SECRET ? { crypto: { secret: process.env.SECRET } } : {}),
  touchAfter: 48 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR In Mongo Session Store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "secretkey_x",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
  },
  httpOnly: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

Main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error("FATAL: Could not connect to MongoDB:", err.message);
    process.exit(1);
  });

async function Main() {
  await mongoose.connect(dbUrl);
}

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Health check for Render / UptimeRobot - no DB needed
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/listings", listingsRoutes);
app.use("/listings/:id/reviews", reviewsRoutes);
app.use("/", UserRoutes);

// 404 ROUTE HANDLER
app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listing/error.ejs", { message });
});

// Render assigns the port via process.env.PORT - never hardcode it.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
