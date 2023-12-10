const User = require('../models/user');

const { VALIDATION_ERROR, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(err => {
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка', err: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error("Not Found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные'});
        return;
      } if (err.message === "Not Found") {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка', err: err.message });
      return;
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else {
        res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка`, err: err.message })
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка', err: err.message })
      }
    })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка', err: err.message })
      }
    })
}