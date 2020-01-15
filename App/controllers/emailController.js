var express = require("express");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saviourtrusttestemail@gmail.com',
      pass: 'SaviourTrust44'
    }
  });
  
  var mailOptions = {
    from: 'saviourtrusttestemail@gmail.com',
    to: 'lawrence1910@gmail.com',
    subject: 'HOT SINGLES IN THE AREA',
    text: 'That was easy! Is what you will say after meeting hot singles in the area'
  };
  
  module.exports.sendEmail = (req, callback) =>{

    // variable storing confirmation of email sending
    var emailConfirmation;
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
     emailConfirmation = 'Email sent: ' + info.response;
    }
  }); 
  callback(emailConfirmation);
};