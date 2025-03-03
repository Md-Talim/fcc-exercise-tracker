const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const database = [
  {
    username: "fcc_test",
    count: 1, // count of objects in log array
    _id: "5fb5853f734231456ccb3b05",
    log: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      },
    ],
  },
];

const findUserByUsername = (username) => {
  return database.find((user) => user.username == username);
};

app.post("/api/users", (req, res) => {
  const { username } = req.body;
  const existingUser = findUserByUsername(username);

  if (existingUser != undefined) {
    return res.json({ username, _id: existingUser.id });
  }

  const _id = crypto.randomUUID();
  database.push({ username, _id, count: 0, log: [] });
  return res.json({ username, _id });
});

app.get("/api/users", (_, res) => {
  const users = database.map(({ username, _id }) => ({ username, _id }));
  return res.json(users);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
