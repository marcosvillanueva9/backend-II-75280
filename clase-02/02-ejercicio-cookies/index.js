import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;

app.use(urlencoded({ extended: true }));
app.use(cookieParser('coderhouse'));
app.use(express.json());
app.use(express.static('public'));

app.post('/cookies', (req, res) => {
    let { username, email} = req.body;
    if (!username || !email) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const value = JSON.stringify({ username, email });
    res.cookie('usuario', value, { maxAge: 60000});
    res.json({ proceso: 'ok' });
});

app.get('/cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
}
);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});