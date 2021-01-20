const router = require('express').Router();
const errorMiddleware = require('../../middleware/errorMiddleware');
const requireAuth = require('../../middleware/requireAuth');

router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));
router.use('/board', requireAuth, require('./board.route'));

router.use(errorMiddleware);

module.exports = router;
