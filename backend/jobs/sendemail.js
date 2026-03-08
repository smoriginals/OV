import transporter from "./mailer.js";

const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.BREVO_EMAIL_FROM,
            to,
            subject,
            html
        })
        console.log("Email Sent:", info.messageId)
    }
    catch (error) {
        console.log("Email sending Failed:",error)
    }
}

export default sendMail;