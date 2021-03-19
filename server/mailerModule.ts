const nodemailer = require('nodemailer');
let BluebirdPromise = require('bluebird');

let transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:process.env.EMAILADDRESS,
      pass:process.env.EMAILPASS
  }
})

let sendMailAsync = BluebirdPromise.promisify(transporter.sendMail);

async function sendMail(email:String, sub:String, msg:String) {
    let mail = {
        from : process.env.EMAILADDRESS,
        to: email,
        subject: sub,
        text: msg
    };

    try {
        let info = await sendMailAsync(mail);
        console.log(info);
        return true;
    } catch(err) {
        return false;
    }

}

module.exports = sendMail;


