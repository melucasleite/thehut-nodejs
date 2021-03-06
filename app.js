require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var logger = require('morgan');
const PORT = process.env.PORT || 8080;
const studentRoutes = require("./routes/student");
const lectureRoutes = require("./routes/lecture");
const authRoutes = require("./routes/auth");

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/students", studentRoutes);
app.use("/lectures", lectureRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    await app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}

start();

module.exports = app;
