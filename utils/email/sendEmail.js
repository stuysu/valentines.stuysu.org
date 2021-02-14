import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(process.env.MAILER_URL, {
    from: `StuySU Valentines Mailer <valentines@stuysu.org>`,
});

export default transporter;
