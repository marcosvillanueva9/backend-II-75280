import express from 'express';
import session from 'express-session';

const app = express();

const PORT = 8080;

app.use(session({
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1
        req.session.nombre = req.query.nombre || 'Anakin';
        res.send('Hello there ' + req.session.nombre);
    } else {
        req.session.contador++;
        res.send('Hello there ' + req.session.nombre + ', Usted ha visitado esta pagina ' + req.session.contador + ' veces');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.send('Sesión cerrada');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});