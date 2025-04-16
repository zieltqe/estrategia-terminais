const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Chaves válidas (poderia usar banco no futuro)
const validKeys = ['chave123', 'api-tqe-2025'];

app.use(cors());

app.get('/search', (req, res) => {
  const { query, apikey } = req.query;

  if (!apikey || !validKeys.includes(apikey)) {
    return res.status(401).json({ error: 'Chave de API inválida.' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Parâmetro de busca ausente.' });
  }

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`;

  res.json({
    resultado: 'ok',
    pesquisa: query,
    url: searchUrl
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
