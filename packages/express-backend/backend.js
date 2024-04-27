// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-services.js"; 

// boring stuff
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET request by name or job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService.getUsers(name, job)
  .then((result) => res.send({ users_list: result }))
  .catch(() => res.send(users));
});

// GET request by ID
app.get("/users/:id", (req, res) => {
  userService.findUserById(req.params.id)
  .then((result) => res.send({ users_list: result }))
  .catch(() => res.status(404).send("Could not find ID."));
});

// POST request
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
  .then((result) => res.status(201).send(result))
  .catch(() => res.status(400).send("User could not be added."));
});

// DELETE request
app.delete("/users/:id", (req, res) => {
  userService.deleteUserById(req.params.id)
  .then((result) => {
      res.status(204).send(result);
  })
  .catch(() => res.status(404).send("User could not be deleted."));
});

app.listen(port, () => {
  console.log(
      `Example app listening at http://localhost:${port}`
  );
});