const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(auth);
app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use(errors());
app.use(errorHandler);
app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
