"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");

const createUser = async (request, response) => {
  const { email, userName, password } = request.body;

  console.log(request.body);
  //create new user document. ignore unwanted keys and create id
  let newUser = {
    email: email,
    password: password,
    userName: userName,
  };

  console.log(newUser);

  //validation for missing information
  if (Object.values(newUser).some((value) => !value)) {
    return response.status(400).json({
      status: 400,
      data: newUser,
      message: "missing information",
    });
  }

  //add data to the newUser object
  newUser = {
    ...newUser,
    lowerCaseUserName: userName.toLowerCase(),
    _id: uuidv4(),
    playingGames: [],
    profile: {},
  };

  //lower case email just in case
  newUser.email.toLowerCase()

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_lfg");


    //validate if email is not already in use
    const existingEmail = await db
      .collection("users")
      .findOne({ email: newUser.email });
    if (existingEmail) {
      return response.status(400).json({
        status: 400,
        data: newUser,
        message: "email already in use",
      });
    }

    await db.collection("users").insertOne(newUser);
    //remove password before sending data back
    delete newUser.password;
    response
      .status(201)
      .json({ status: 201, data: newUser, message: "user created" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = createUser;
