const express = require("express");
const data = require("./users");
const users = data.users;
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  const { search } = req.query;
  if (search) {
    const matches = users.filter((user) => user.lname === search);
    res.json(matches);
  } else {
    res.json(users);
  }
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(users);
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.json([user]);
  } else {
    res.sendStatus(404);
  }
});

app.post("/users", (req, res) => {
  const { fname, lname } = req.body;
  const user = {
    id: uuid(),
    fname,
    lname,
  };
  users.push(user);
  res.status(201).send(user);
});

app.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { fname, lname } = req.body;
  let user = users.find((user) => user.id === userId);
  if (user) {
    user.fname = fname;
    user.lname = lname;
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;
  let id = users.findIndex((user) => user.id === userId);
  if (id >= 0) {
    users.splice(id, 1);
  }
  res.json(users);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
