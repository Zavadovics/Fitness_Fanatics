import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendEmail = async (link, user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: 'Fitness Fanatics - jelszócsere',
      text: `Az alábbi linkre kattintva lecserélheted a jelszavad: ${link} - a link 15 perc múlva lejár !`,
    });

    console.log('email sent successfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

export default sendEmail;
