import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

mongoose.connect('mongodb://localhost:27017/sessions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();

const PORT = 8080;

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/sessionsDB',
        collectionName: 'sessions',
        ttl: 3600
    }),
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