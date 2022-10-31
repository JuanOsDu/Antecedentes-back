var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'RegistraduriaKonrad2022@outlook.com',
        pass: 'Registraduria2022*'
    }
});

const send =async(mailOptions)=>{
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            throw new Error("Error enviando correo")
        }
    
        console.log('Correo enviado: ' + info.response);
    });
}


module.exports = {send}