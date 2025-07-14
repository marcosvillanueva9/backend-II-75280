import express from 'express';
//import cors from 'cors';

const app = express();

app.use(express.json());
//app.use(cors());
app.get('/test', (req, res) => {
    res.json({ message: 'Respuesta!' });
});

app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});