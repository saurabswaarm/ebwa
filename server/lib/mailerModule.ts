import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:process.env.EMAILADDRESS,
      pass:process.env.EMAILPASS
  }
})

async function sendMail(email:String, sub:String, msg:String) {
    let mail = {
        from : process.env.EMAILADDRESS,
        to: email,
        subject: sub,
        text: msg
    };

    try {
        let info = await transporter.sendMail(mail);
        return info;
    } catch(err) {
        console.log(err);
        return false;
    }

}

export default sendMail;


