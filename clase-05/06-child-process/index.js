import express from 'express';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

let visitas = 0;

// Ruta principal - contador de visitas
app.get('/', (req, res) => {
  visitas++;
  res.send(`La cantidad de visitas es: ${visitas}`);
});

// Cálculo bloqueante
app.get('/calculo-bloq', (req, res) => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  res.send(`El resultado de la suma bloqueante es: ${suma}`);
});

// Cálculo NO bloqueante (usando child process)
app.get('/calculo-nobloq', (req, res) => {
  const child = fork(path.join(__dirname, 'sumador.js'));
  child.send('iniciar');

  child.on('message', (suma) => {
    res.send(`El resultado de la suma NO bloqueante es: ${suma}`);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
