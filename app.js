const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND).send('Страница не найдена');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
