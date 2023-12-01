"use strict";

const express = require("express");
const morgan = require("morgan");

//----------HANDLERS IMPORT HERE--------------
const getTwitchAuthentification = require("./handlers/getTwitchAuthentification");
const getGamesSearch = require("./handlers/getGamesSearch");
const createUser = require("./handlers/createUser");
const getUserAuthentification = require("./handlers/getUserAuthentification");
const addGame = require("./handlers/addGame");
const removeGame = require("./handlers/removeGame");
const getGames = require("./handlers/getGames")
const getUserSeach = require("./handlers/getUsersSearch")
const addFriend = require("./handlers/addFriend")
const getUsers = require("./handlers/getUsers")

express()
  .use(express.json())
  .use(morgan("tiny"))
  //Not exactly sure what this one does. I copied it from a previous project.
  //Original comment said: Any requests for static files will go into the public folder
  .use(express.static("public"))

  //------------ENDPOINTS HERE---------------
  .get("/get-twitch-authentification", getTwitchAuthentification)
  .get("/get-games-search/:query", getGamesSearch)
  .post("/create-user", createUser)
  .post("/get-user-authentification", getUserAuthentification)
  .patch("/add-game", addGame)
  .patch("/remove-game", removeGame)
  .post("/get-games", getGames)
  .get("/get-users-search/:query", getUserSeach)
  .patch('/add-friend', addFriend)
  .post("/get-users", getUsers)

  // Catches all error response
  .get("*", (request, response) => {
    response.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => {
    console.log(`Server listening on port ${8000}`);
  });
