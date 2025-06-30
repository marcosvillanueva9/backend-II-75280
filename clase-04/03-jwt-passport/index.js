import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { initializePassport } from './src/config/passport.config.js'
import { passportAuth, authorization } from './src/middlewares/passportAuth.js';
import { generateToken } from './src/utils/jwt.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.JWT_SECRET));

initializePassport();
app.use(passport.initialize());

app.post('/api/login', (req, res) => {
    // const {email, password} = req.body
    // const user = User.findOne({email})

    // if (!user || )
    // VALIDACION EN LA DB DE QUE EXISTA EL USUARIO
    const user = {
        _id: 1,
        email: "a@a",
        role: "user"
    }

    const token = generateToken(user)
    res.cookie('currentUser', token, {signed: true, httpOnly: true})
    res.redirect('/current')
})

app.get('/current', passportAuth, authorization("user"), (req, res) => {
    res.json({
        message: "te logueaste joya",
        user: req.user
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('corriendo en el ', PORT)
})