import "dotenv/config";

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    },
    auth:{
        user:"martinalberti123@gmail.com",
        pass: process.env.MAIL_PASSWORD ,
        authMethod: "LOGIN"
    }
})

//Funciones de nodemailer

export const sendRecoveryEmail = (email, recoveryLink) => {
    const mailOptions = {
        from: 'martinalberti123@gmail.com',
        to: email,
        subject: 'Link de recuperacion de su contraseña',
        text: `Por favor haz click en el siguiente enlace ${recoveryLink}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('Email enviado correctamente')
    })
}

