const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("94V8!ssM+u9UgE!%"));

app.use("/api", router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening on port ${process.env.NODE_PORT}`);
});
