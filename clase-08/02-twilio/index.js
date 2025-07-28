import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8080;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.use(express.json());

app.post('/whatsapp', async (req, res) => {
    try {
        const { msg } = req.body;
        if (!msg) {
            return res.status(400).send('Message content is required');
        }

        const message = await client.messages.create({
            from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
            to: process.env.PERSONAL_WHATSAPP_NUMBER,
            body: msg
        });

        res.send(`Message sent successfully! Message SID: ${message.sid}`);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});