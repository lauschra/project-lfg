"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getUserSeach = async (request, response) => {
  const { query } = request.params;
  query.toLowerCase();

  const client = new MongoClient(MONGO_URI);
  try {
    const db = client.db("project_lfg");

    //fetch all user names in mongo
    const userNamesList = await db
      .collection("users")
      .find({})
      .project({ userName: 1, lowerCaseUserName: 1, "profile.avatar":1, playingGames: 1 })
      .toArray();

    //extract only usernames that match the query
    const filteredUserNameList = userNamesList.filter((user) =>
      user.lowerCaseUserName.includes(query)
    );

    //validate if at least one use was found
    if (filteredUserNameList.length < 1) {
      return response.status(404).json({
        status: 404,
        data: null,
        message: "No user with that name found!",
      });
    }

    response
      .status(200)
      .json({ status: 200, data: filteredUserNameList, message: "success" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: 500,
        data: error.message,
        message: "unknow error as occured",
      });
  } finally {
    client.close();
  }
};

module.exports = getUserSeach;
