const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const helpers = require("./helpers");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.currentPath = req.path;
  next();
});

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("This page does not exist");
});

//CHECK
// app.use(function(err, req, res, next) {
//   console.log(err);
//   if (err.code === "LIMIT_FILE_SIZE") {
//     console.log(
//       "LIMIT_FILE_SIZE LIMIT_FILE_SIZE LIMIT_FILE_SIZE LIMIT_FILE_SIZE "
//     );
//   }
//   res.status(413).send("Filen är för stor kan inte överskrida XXXX");
// });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.stack);

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
