var express = require("express");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saviourtrusttestemail@gmail.com',
      pass: 'SaviourTrust44'
    }
  });
  
  // function to send email to worker
  module.exports.sendEmail = (req, callback) =>{

    console.log(req.body);
    // variable storing confirmation of email sending
    var emailConfirmation;

    // getting the main contents of email from data field on form
    var emailText = req.body.email
    console.log(emailText);
    var houseAddress = req.body.houseaddress;
    console.log("address"+houseAddress);
    
    //configuring the email
    var mailOptions = {
        from: 'saviourtrusttestemail@gmail.com',
        to: 'saviourtrusttestemail@gmail.com',
        subject: houseAddress,
        text: emailText
      };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
     emailConfirmation = 'Email sent: ' + info.response;
    }
  });
  callback();
};