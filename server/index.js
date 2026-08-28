const express = require('express');
const cors = require('cors');

const app = express();

// Permite peticiones desde el frontend en el puerto 3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/api/status', (req, res) => {
  setTimeout(() => {
    res.json({ message: '¡Sistemas operativos y sincronizados!' });
  }, 1500);
});

app.listen(3001, () => {
  console.log('Backend (Node+Express) escuchando en http://localhost:3001');
});