import nodemailer from 'nodemailer'

export const sendMail = async (email, subject,html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_EMAIL_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: `ELearning`,
            subject,
            to: email,
            html
        });

       return true
    } catch (error) {
        console.error("Email not sent:", error.message);
        return false
    }
}
