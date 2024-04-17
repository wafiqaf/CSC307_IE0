import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );
  
  const [characters, setCharacters] = useState([]);

function removeOneCharacter(id) {
  delUser(id)
    .then(response => {
      if (response.status === 204) {
        setCharacters(characters.filter(character => character.id !== id));
      } else if (response.status === 404) {
        console.error("Resource not found: " + response.status);
      } else {
        console.error("Unexpected response status: " + response.status);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function delUser(id) {
  const promise = fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return promise;
}

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Failed to add user: " + response.status);
      }
    })
    .then((newUser) => {
      const updatedUser = { ...person, id: newUser.id };
      setCharacters([...characters, updatedUser]);
    })
      .catch((error) => {
        console.log(error);
      })
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  return (
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}

export default MyApp;
