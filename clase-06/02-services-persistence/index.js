import express from 'express';
import toysRouter from './src/router/toys.router.js';
import usersRouter from './src/router/users.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/toys', toysRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
