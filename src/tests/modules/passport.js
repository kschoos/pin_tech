var EmailVerification = require("../modules/emailverification.js");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/users.js");

module.exports = function(passport){
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  }) 

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      done(err, user);
    })
  })

  passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, (req, email, password, done)=>{
    process.nextTick(()=>{
      User.findOne({"local.email": email}, (err, user)=>{
        if(err)
          return done(err);
        if(user)
          return done(null, false, {code: 10});

        if(email.match(/\w*@\w*\.\w*/) == null){
          return done(null, false, {code: 11});
        }

        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.EMAIL = email.toUpperCase();
          newUser.local.password = newUser.generateHash(password);
          newUser.local.verified = false;
          newUser.local.createdAt = Date.now(); // We have to set it here in stead of setting a default. This prevents it from being refreshed when saving the User again later.

          var hash = Math.random().toString(36).substring(7);
          newUser.local.verificationHash = hash;
          EmailVerification(email, hash);
          newUser.save((err)=>{
            if(err) throw err;
            return done(null, false, {code: 0});
          })
        }
        
      })
    })
  }))


  passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, (req, email, password, done)=>{
    User.findOne({ $or: [{"local.EMAIL": email.toUpperCase()}, { $and: [{ "local.USERNAME": email.toUpperCase()}, { "local.USERNAME": { $exists: true }}]}]}, (err, user)=>{
      if(err)
        return done(err);

      if(!user){
        console.log("You are not registered.");
        return done(null, false, {code: 10});
      }

      if(!user.validPassword(password)){
        console.log("You entered a wrong password.");
        return done(null, false, {code: 11});
      }

      if(!user.local.verified){
        console.log("Please verify your email adress before continuing.");
        return done(null, false, {code: 12});
      }

      return done(null, user, {code: 0});
    })
  }))
}
