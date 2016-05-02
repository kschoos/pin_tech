// Dependencies
//----------------
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyparser = require("body-parser");

// App Configuration
//---------------------
var port = process.env.PORT || 5000;
var app = express();
app.use(express.static(_dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "jade");
app.use(session({ secret: "Some ultra secret secret." }))
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, () => {
  console.log("Server up and running on port " + port);
})

