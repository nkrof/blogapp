const express = require("express");
const router = require("./routes/index.js");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

console.log(process.env.MONGOOSE_URL);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());

app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening on port ${process.env.NODE_PORT}`);
});
