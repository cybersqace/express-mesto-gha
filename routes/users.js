const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validations');

router.get('/users', getUsers);

router.get('/users/:userId', userIdValidation, getUserById);

router.get('/users/me', getCurrentUser);

router.patch('/users/me', updateUserValidation, updateUser);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
