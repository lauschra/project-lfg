"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getUserAuthentification = async (request, response) => {
  const { email, password } = request.body;

  //validate for missing information
  if (!email || !password) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message: "missing information",
    });
  }

  //lower case the email
  email.toLowerCase()

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_lfg");
    const result = await db.collection("users").find({ email: email }).toArray();

    //check if account exists
    if (!result[0]) {
      return response.status(400).json({
        status: 400,
        data: request.body.email,
        message: "This email doesn't exist. Sign-up first!",
      });
    }

    //return an error if the data base is corrupted somehow
    if (result.length > 1) {
      return response.status(500).json({
        status: 500,
        data: request.body.email,
        message:
          "There is more then one account using this email. Contact support!",
      });
    }

    //convert data to an object if only one account was found
    const userInfos = result[0];

    // validate if password match and removes it from data
    if (password === userInfos.password) {
      delete userInfos.password;
    } else {
      return response.status(400).json({
        status: 400,
        data: request.body.email,
        message: "invalide password",
      });
    }

    response.status(201).json({
      status: 201,
      data: { ...userInfos },
      message: "Anthentification completed",
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = getUserAuthentification;
