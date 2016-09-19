const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport('smtps://15606617716@163.com:yy123456@smtp.163.com');

// setup e-mail data with unicode symbols
let mailOptions = {
  from: '"网易邮箱 👥" <15606617716@163.com>', // sender address
  to: '394062113@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Useless but necessary content.', // plaintext body
  html: '<b>Hello world ?html?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});