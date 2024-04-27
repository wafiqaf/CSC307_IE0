import mongoose from "mongoose";
import User from "../models/user.js";

// MONGOOSING
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true, useUnifiedTopology: true,}).catch((error) => console.log(error));

function getUsers(name, job) {
    let prommy;
    if (name === undefined && job === undefined) {
      prommy = User.find();
    } else if (name && !job) {
      prommy = findUserByName(name);
    } else if (!name && job) {
      prommy = findUserByJob(job);
    } else if (name && job) {
      prommy = findUserByNameAndJob(name, job);
    }
    return prommy;
}

// find users

function findUserById(id) {
    return User.findById(id);
}

function findUserByName(name) {
    return User.find({ name: name });
}

function findUserByJob(job) {
    return User.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return User.find({ name: name, job: job });
}

function addUser(user) {
  const userToAdd = new User(user);
  const prommy = userToAdd.save();
  return prommy;
}

function deleteUserById(id) {
    return User.findByIdAndDelete(id);
}

export default { addUser, getUsers, findUserById, findUserByName, findUserByJob, findUserByNameAndJob, deleteUserById };