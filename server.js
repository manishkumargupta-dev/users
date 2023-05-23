const express = require("express");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const User = require("./user");
mongoose
  .connect(process.env.DBURI)
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { fname, lname } = req.body;
  const user = await User.create({
    id: uuid(),
    fname,
    lname,
  });
  await user.save();

  res.status(201).send(user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
