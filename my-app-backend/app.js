const express = require("express");
const bodyparser = require("body-parser");
const httperror = require("./models/http-error");
const userRouter = require("./routes/user-routes");

const placeRouter = require("./routes/places-routes");

const mongoose = require("mongoose");

const app = express();
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type,Accept,Authorization,X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");
  next();
});
app.use("/api/places", placeRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  return next(new httperror("invalid route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unkonwn wrror ocurred" });
});

mongoose
  .connect(
    "mongodb+srv://diyans:sd.281506@sd-281506-engm4.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
