const express = require('express');
const app = express();
const port = 8081;

app.use(express.json());

const cardRoutes = require('./routes/cardRoutes');
app.use('/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
