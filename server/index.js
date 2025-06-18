const express = require('express');
const birdRouter = require('./routes/birdRouter');
const searchRouter = require('./routes/searchRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/birds', birdRouter);
app.use('/api/search', searchRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Bird API with Search functionality!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
