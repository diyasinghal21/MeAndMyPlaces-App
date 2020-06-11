const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

let DummyUser = [

];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("error gettin list of user", 500));
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("please check the data you input", 422));
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("try again", 422));
  }

  if (hasUser) {
    const error = new HttpError("this email address already exits", 422);
    return next(error);
  }

  let hashedpassword;
  try {
    hashedpassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('could not create user try again', 500);
    return next(error);
  }

  const createdUser = new User({
    places: [],
    name,
    email,
    password: hashedpassword,
    image: "hello.com",
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("error signing up", 422));
  }
  let token = jwt.sign({ userid: createdUser.id, email: createdUser.email }, 'dishi', { expiresIn: '1h' });


  res.status(200).json({ user: createdUser.toObject({ getters: true }), token: token });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("error while logging in", 500);
    return next(error);
  }
  if (!identifiedUser) {
    return next(new HttpError("invalid credentials", 500));
  }
  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, identifiedUser.password)
  } catch (err) {
    const error = new HttpError("could not log in", 500);
    return next(error);
  }

  if (!isValid) {
    const error = new HttpError('invalid credentials......', 401);
    return next(error);
  }

  let token = jwt.sign({ userid: identifiedUser.id, email: identifiedUser.email }, 'dishi', { expiresIn: '1h' });

  res.status(201).json({ message: "logged in sucessfully", user: identifiedUser.toObject({ getters: true }), token: token });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
