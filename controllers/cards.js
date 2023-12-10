const Card = require('../models/card');

const { VALIDATION_ERROR, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(err => {
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка', err: err.message });
    })
};

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name = "ValidationError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else {
        res.status(DEFAULT_ERROR).send({ message: `Произошла ошибка`, err: err.message });
      }
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else if (err.name = "Not Found") {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка', err: err.message });
      }
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else if (err.name = "Not Found") {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена'});
        return;
      } else {
        res.status(DEFAULT_ERROR).sendsend({ message: 'Произошла ошибка', err: err.message });
      }
    })
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      } else if (err.name = "Not Found") {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      } else {
        res.status(DEFAULT_ERROR).sendsend({ message: 'Произошла ошибка', err: err.message });
      }
    })
};