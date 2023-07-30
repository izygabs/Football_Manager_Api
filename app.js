const express = require("express");
const app = express();
const PORT = process.env.port || 2500;
const mongoose = require("mongoose");
const route = require("./routes/allRoutes");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://127.0.0.1:27017/Football_Manager_Api");

app.use(express.json());

app.use(cookieParser());

app.use(route);

app.post("/home", (req, res) => {
  res.send("Football is Life");
});

app.listen(PORT, () => {
  console.log(`Server is served on port ${PORT}`);
});
