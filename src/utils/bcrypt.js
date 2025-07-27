const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (plain, hashed) =>
  await bcrypt.compare(plain, hashed);

module.exports = { hashPassword, comparePasswords };
