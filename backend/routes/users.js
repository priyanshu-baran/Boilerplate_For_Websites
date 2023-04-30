import express from 'express';
const router = express.Router();

import User from '../models/user.model.js';

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:username').get(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.route('/update/:username').post(async (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { password: req.body.password }
  )
    .then(() => res.json('Password Updated'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const country = req.body.country;
  const gender = req.body.gender;
  const newUser = new User({
    username,
    password,
    email,
    country,
    gender,
  });
  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

export default router;
