const router = require('express').Router();
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

const User = require('../../models/User.model');

router.post('/signup', async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const user = new User({ username, email });

    if (password) {
      await user.setPassword(password);
    }

    await user.save();

    req.session.userId = user._id;

    res.json(new SuccessResponse({ user }));
  } catch (error) {
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(401).json(new ErrorResponse('Wrong credentials'));
    }

    const isValid = await user.isPasswordValid(password);

    if (isValid) {
      req.session.userId = user._id;

      return res.json(new SuccessResponse({ user }));
    } else {
      return res.status(401).json(new ErrorResponse('Wrong credentials'));
    }
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).exec();

    if (user) {
      return res.json(new SuccessResponse({ user }));
    } else {
      return res.status(401).json(new ErrorResponse());
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
