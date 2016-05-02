"use strict";

var EmailTemplate = require("email-templates").EmailTemplate;
var path = require("path");
var nodemailer = require("nodemailer");

var smtpconfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PASS
  }
};

var transporter = nodemailer.createTransport(smtpconfig);

var emailConfiguration = {
  from: "donotrespond@skusku.org",
  subject: "Bookilook email verification"
};

var templateDir = "templates/verification-email";
var mail = new EmailTemplate(templateDir);

module.exports = function (TO, hash, callback) {
  // TO can either be a comma seperated list of emails as a string, or an array, or a single email adress.
  if (Array.isArray(TO)) TO = TO.join(",");

  emailConfiguration.to = TO;
  mail.render({ hash: hash }, function (err, result) {
    if (err) throw err;
    emailConfiguration.html = result.html;
    transporter.sendMail(emailConfiguration, callback);
  });
};
