import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import sessionRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = 8080;

mongoose.connect('mongodb://localhost:27017/sessions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/LoginDB'
  }),
  secret: 'secretcoder',
  resave: false,
  saveUninitialized: false
}));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
