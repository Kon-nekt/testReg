var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var mongoose = require('mongoose');
var db = mongoose.connection;

var download = require("./routes/download");
var register = require("./routes/register");
var index = require("./routes/index");
var forgot = require("./routes/forgot");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/download", download);
app.use("/register", register);
app.use("/", index);
app.use("/forgot", forgot);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/ukit', { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});

module.exports = app;
