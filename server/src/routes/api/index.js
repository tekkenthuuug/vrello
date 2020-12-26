const router = require('express').Router();
const validationErrorMiddleware = require('../../middleware/validationErrorMiddleware');

router.use('/auth', require('./auth.route'));
router.use('/user', require('./user.route'));
router.use('/board', require('./board.route'));

router.use(validationErrorMiddleware);

module.exports = router;
