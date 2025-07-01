import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser('mi-secreto'));
app.use(express.json());

app.post('/cookies', (req, res) => {
    let { clave, valor, tiempo, firma } = req.body;

    if (!firma) {
        firma = false;
    }

    if (!clave || !valor) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    if (tiempo) {
        res.cookie(clave, valor, { maxAge: tiempo * 1000, signed: firma });
    } else {
        res.cookie(clave, valor, { signed: firma });
    }

    res.json({ proceso: 'ok' });
})

app.get('/cookies', (req, res) => {
    res.json({
        normalCookies: req.cookies,
        firmadasCookies: req.signedCookies
    });
})

app.get('/default', (req, res) => {
    res.cookie('default', 'valor por defecto', { });
    res.json({ proceso: 'ok' });
})

app.delete('/cookies/:clave', (req, res) => {
    const { clave } = req.params;

    if (!clave) {
        return res.status(400).json({ error: 'Falta la clave' });
    }

    res.clearCookie(clave);
    res.json({ proceso: 'ok' });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
