const router = require('express').Router();
const validationErrorMiddleware = require('../../middleware/validationErrorMiddleware');

router.use('/auth', require('./auth.route'));

router.use(validationErrorMiddleware);

module.exports = router;
