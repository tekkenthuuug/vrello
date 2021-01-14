const router = require('express').Router();
const validationErrorMiddleware = require('../../middleware/validationErrorMiddleware');
const requireAuth = require('../../middleware/requireAuth');

router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));
router.use('/board', requireAuth, require('./board.route'));

router.use(validationErrorMiddleware);

module.exports = router;
