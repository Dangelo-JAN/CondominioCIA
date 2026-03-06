import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js";
import { Emailclient, sender } from "./nodemailer.config.js";

export const SendVerificationEmail = async (email, verificationcode) => {
    try {
        const mailOptions = {
            from: `Condominio CIA <${sender}>`,
            to: email,
            subject: "Verifica tu correo electrónico",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationcode),
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email de verificación enviado:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error en SendVerificationEmail:", error);
        return false;
    }
}

export const SendWelcomeEmail = async (email, firstname, lastname, role) => {
    try {
        const mailOptions = {
            from: `Condominio CIA <${sender}>`,
            to: email,
            subject: "¡Bienvenido a la plataforma!",
            html: `<h1>Hola ${firstname} ${lastname}</h1><p>Tu cuenta como ${role} ha sido activada correctamente.</p>`,
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error en SendWelcomeEmail:", error);
        return false;
    }
}

export const SendForgotPasswordEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: `Condominio CIA <${sender}>`,
            to: email,
            subject: "Restablecer tu contraseña",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error en SendForgotPasswordEmail:", error);
        return false;
    }
}

export const SendResetPasswordConfimation = async (email) => {
    try {
        const mailOptions = {
            from: `Condominio CIA <${sender}>`,
            to: email,
            subject: "Contraseña restablecida con éxito",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error en SendResetPasswordConfimation:", error);
        return false;
    }
}
