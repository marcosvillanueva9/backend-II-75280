process.on('message', () => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma++;
  }
  process.send(suma);
});
