const router = require("express").Router();
const User = require("../mongoose/schema/userSchema.js");
const { userSchema } = require("../utils/validationSchemas.js");
const { hashPassword, comparePasswords } = require("../utils/bcrypt.js");
const { generateToken, verifyToken } = require("../utils/auth.js");

const dataValidation = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    console.log(error);
    return res.sendStatus(400);
  }
  req.validatedData = value;
  next();
};

router.post("/user", dataValidation, async (req, res) => {
  const { validatedData } = req;
  const date = new Date(Date.now()).toISOString().split("T")[0];
  validatedData.password = await hashPassword(validatedData.password);

  const newUser = await User.create({
    ...validatedData,
    lastActiveAt: date,
  });

  const jwttoken = generateToken({
    id: newUser._id,
    username: validatedData.username,
  });

  res.cookie("token", jwttoken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 3600000,
  });

  return res.sendStatus(201);
});

router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  const isPasswordCorrect = await comparePasswords(password, findUser.password);

  if (!isPasswordCorrect) return res.status(401).send("Incorrect password!");

  const jwttoken = generateToken({
    id: findUser._id,
    username: findUser.username,
  });

  res.cookie("token", jwttoken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 3600000,
  });

  return res.sendStatus(200);
});

module.exports = router;
