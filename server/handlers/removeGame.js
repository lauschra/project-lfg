"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const removeGame = async (request, response) => {
  const { userId, gameId } = request.body;

  //validate for correct key naming
  if (!userId || !gameId) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message: "missing information. Need: userId, gameId",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_lfg");

    //look for the user in mongo
    const userDocument = await db.collection("users").findOne({ _id: userId });

    //validate if user exist
    if (!userDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "user id not found",
      });
    }

    //validate if the game is in the users games array
    if (!userDocument.playingGames.find((game) => game === gameId)) {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "Game id already removed",
      });
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userId }, { $pull: { playingGames: gameId } });
    if (result.modifiedCount === 1) {
      response
        .status(201)
        .json({ status: 201, data: gameId, message: "Game id removed" });
    } else {
      response.status(400).json({
        status: 400,
        data: request.body,
        message: "Mongo couldn't be updated",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: 500,
      data: error.message,
      message: "unknow error as occured",
    });
  } finally {
    client.close();
  }
};

module.exports = removeGame;
