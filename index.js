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

const findUserById = (id) => {
  return database.find((user) => user._id == id);
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

app.post("/api/users/:_id/exercises", (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const user = findUserById(_id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const formattedDate = date
    ? new Date(date).toDateString()
    : new Date().toDateString();

  const newLog = {
    description,
    duration: Number(duration),
    date: formattedDate,
  };
  user.log.push(newLog);
  user.count = user.log.length;

  return res.json({
    username: user.username,
    description: newLog.description,
    duration: newLog.duration,
    date: newLog.date,
    _id,
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const { _id } = req.params;
  let { from, to, limit } = req.query;
  const user = findUserById(_id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  from = from ? new Date(from) : null;
  to = to ? new Date(to) : null;
  limit = limit ? parseInt(limit) : null;

  // Filter logs based on date range
  let filteredLogs = user.log.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (!from || entryDate >= from) && (!to || entryDate <= to);
  });

  if (limit) {
    filteredLogs = filteredLogs.slice(0, limit);
  }

  return res.json({
    username: user.username,
    _id: user._id,
    count: filteredLogs.length,
    log: filteredLogs,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
