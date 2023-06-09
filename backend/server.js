const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
// const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routs
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
