const express = require("express");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const User = require("./user");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
mongoose
  .connect(process.env.DBURI)
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { fname, lname } = req.body;
  const user = new User({
    id: uuid(),
    fname,
    lname,
  });
  await user.save();

  res.status(201).send(user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
