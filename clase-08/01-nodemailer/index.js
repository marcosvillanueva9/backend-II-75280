import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8080;

app.get('/mail', async (req, res) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let result = await transport.sendMail({
        from: `"Marcos Villanueva" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: 'Test Email id10101010 ',
        html: `<h1>Hello, this is a test email!</h1>
        <img src="cid:perrito"/>`,
        attachments: [
            {
                filename: 'foto-perro.jpg',
                path: './foto-perro.jpg',
                cid: 'perrito'
            }
        ]
    });

    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});