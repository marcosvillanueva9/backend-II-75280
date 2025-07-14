import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import initializePassport from './src/config/passport.config.js';
import { passportAuth } from './src/middlewares/passportAuth.js';


const app = express();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));


// Passport
initializePassport();
app.use(passport.initialize());


app.get('/api/current', passportAuth, (req, res) => {
  res.json({
    message: 'Usuario autenticado',
    user: req.user
  });
});

// Conexión a Mongo y levantamos server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
