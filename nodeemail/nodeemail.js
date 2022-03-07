var nodemailer = require('nodemailer');

const nodemail = async (req,res)=>{
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      TLS:true,
      port:587,
      auth: {
        user: 'test.dev788@gmail.com',
        pass: 'admin@1234!'
      }
    });
    
    var mailOptions = {
      from: 'test.dev788@gmail.com',
      to: 'coolsm1998@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send(error)
        // console.log(error);
      } else {
        // console.log('Email sent: ' + info.response);
        res.send('Email sent: ' + info.response);
      }
    });
    
  }
  
module.exports = {nodemail};
