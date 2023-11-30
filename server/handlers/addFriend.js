"use strict";

const { MongoClient } = require("mongodb");
const addGame = require("./addGame");
require("dotenv").config();
const { MONGO_URI } = process.env;

const addFriend = async (request, response) => {
  const { friendId, userId } = request.body;

  //validate for correct key naming
  if (!userId || !friendId) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message: "missing information. Need: friendId, userId",
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
        message: "User with this userId not found",
      });
    }

    //look for the user in mongo
    const friendDocument = await db
      .collection("users")
      .findOne({ _id: friendId });
    //validate if user exist
    if (!friendDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "User with this friendId not found",
      });
    }

    //validate if users are already friends
    const isInUsersFriends = userDocument.friends.list.some(
      (friendId) => friendId === friendDocument._id
    );
    if (isInUsersFriends) {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "This user already have this friend in his friend list",
      });
    }

    //flag if this is a request accepting or a resquest sending
    const isInUsersRequests = userDocument.friends.received.some(
      (friendId) => friendId === friendDocument._id
    );

    //if the friend is not in the user received request, put the friend in the users sent requests and put the user in the friends received requests
    if (!isInUsersRequests) {
      //push respective ids to respective sent adn received arrays
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $push: { "friends.sent": friendId } });
      await db
        .collection("users")
        .updateOne(
          { _id: friendId },
          { $push: { "friends.received": userId } }
        );

      response
        .status(201)
        .json({
          status: 201,
          data: friendId,
          message: "friend request sent and received",
        });

      //if the friend is the users received request, put the friend in the users list and the user in the friends list and revome them from the their respective sent and received requests
    } else if (isInUsersRequests) {
      //push respective ids to both friends.list
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $push: { "friends.list": friendId } });
      await db
        .collection("users")
        .updateOne({ _id: friendId }, { $push: { "friends.list": userId } });

      //pull respective ids from respective sent and received arrays
      await db
        .collection("users")
        .updateOne(
          { _id: userId },
          { $pull: { "friends.received": friendId } }
        );
      await db
        .collection("users")
        .updateOne({ _id: friendId }, { $pull: { "friends.sent": userId } });

      response
        .status(201)
        .json({
          status: 201,
          data: friendId,
          message: "request accepted and friends lists updated",
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

module.exports = addFriend;
