var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://15606617716@163.com:yy123456@smtp.163.com');

// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"15606617716@163.com 👥" <15606617716@163.com>', // sender address
  to: '394062113@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world 🐴', // plaintext body
  html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});