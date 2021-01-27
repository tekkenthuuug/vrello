const router = require('express').Router();
const { SESSION_COOKIE_NAME } = require('../../utils/constants');
const ErrorResponse = require('../../utils/ErrorResponse');

const User = require('../../models/User.model');

router.post('/sign-up', async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const user = new User({ username, email, password });

    await user.setPassword(password);

    await user.save();

    req.session.userId = user._id;

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-in', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return next(new ErrorResponse('Wrong credentials', 422));
    }

    const isValid = await user.isPasswordValid(password);

    if (isValid) {
      req.session.userId = user._id;

      return res.json({ user });
    } else {
      return next(new ErrorResponse('Wrong credentials', 422));
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (user) {
      return res.json({ user });
    } else {
      return res.json({ user: null });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/sign-out', async (req, res, next) => {
  try {
    req.session.destroy(error => {
      res.clearCookie(SESSION_COOKIE_NAME);

      if (error) {
        return res.sendStatus(500);
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
