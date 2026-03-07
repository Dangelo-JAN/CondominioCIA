import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const Emailclient = nodemailer.createTransport({
    host: "://gmail.com",
    port: 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Ayuda a evitar errores de certificados en Render
    }
});

export const sender = process.env.EMAIL_USER;
