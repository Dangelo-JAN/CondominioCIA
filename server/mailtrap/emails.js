import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js";
import { Emailclient, sender } from "./mailtrap.config.js";

export const SendVerificationEmail = async (email, verificationcode) => {
    const recipients = [{ email }];
    try {
        const response = await Emailclient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationcode),
            category: "Email verification"
        });
        return response.success;
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        return false;
    }
};

export const SendWelcomeEmail = async (email, firstname, lastname, role) => {
    const recipients = [{ email }];
    // Nota: Mailtrap requiere que estos UUID de plantilla existan en tu cuenta.
    const templateUuid = role === "HR-Admin" 
        ? "4749eba4-dc99-4658-923e-54ccd0c0b99c" 
        : "cf9f23f4-ebfb-4baa-a69e-bcb76487ac24";

    try {
        const response = await Emailclient.send({
            from: sender,
            to: recipients,
            template_uuid: templateUuid,
            template_variables: {
                "company_info_name": "Condominio CIA - [EMS]",
                "name": `${firstname} ${lastname} ${role === "HR-Admin" ? "- HR" : ""}`
            }
        });
        return response.success;
    } catch (error) {
        console.error("Error sending welcome email:", error.message);
        return false;
    }
};

export const SendForgotPasswordEmail = async (email, resetURL) => {
    const recipients = [{ email }];
    try {
        const response = await Emailclient.send({
            from: sender,
            to: recipients,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Email"
        });
        return response.success;
    } catch (error) {
        console.error("Error sending forgot password email:", error.message);
        return false;
    }
};

export const SendResetPasswordConfimation = async (email) => {
    const recipients = [{ email }];
    try {
        const response = await Emailclient.send({
            from: sender,
            to: recipients,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Confirmation"
        });
        return response.success;
    } catch (error) {
        console.error("Error sending reset confirmation email:", error.message);
        return false;
    }
};
