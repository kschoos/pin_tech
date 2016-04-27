var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var User = mongoose.Schema({
  local:{
    USERNAME: String,
    username: String,
    EMAIL: String,
    email: String,
    country: String,
    city: String,
    address: String,
    password: String,
    verificationHash: String,
    verified: Boolean,
    books: Array,
    book_titles: [String],
    createdAt: {
      type: Date,
      expires: 900
    }
  }
})

User.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.methods.validPassword = function(password, callback){
    return bcrypt.compareSync(password, this.local.password);
} 


module.exports = mongoose.model("User", User);
