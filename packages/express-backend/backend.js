// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    ).filter(
      (user) => user["job"] === job
    );
  };

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

function generateID() {
  let genid = "";
  for (let i = 0; i < 6; i++) {
    // want to generate 3 letters first
    if (i < 3) {
      const f3 = Math.floor(Math.random() * (122 - 97) + 97);
      genid += String.fromCharCode(f3);
    } else { // for last 3 letters we take a num 0-9
      const l3 = Math.floor(Math.random() * 10);
      genid += l3;
    }
  }
  return genid;
}

const addUser = (user) => {
  const newID = generateID();
  const newUser = { id: newID, ...user };
    users["users_list"].push(newUser);
    return newUser;
  };


const deleteUser = (id) => {
  const ind = users["users_list"].findIndex(user => user.id === id);
  if (ind !== -1) {
      users["users_list"].splice(ind, 1);
  }
  return 1;
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    if (newUser) {
      res.status(201).send(newUser);
    } else {
      res.status(400).send({ error: "Failed to add user."})
    }
  });

  app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const success = deleteUser(userId);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});