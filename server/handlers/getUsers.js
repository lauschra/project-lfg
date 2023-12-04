"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getUsers = async (request, response) => {
  const { usersIds } = request.body;

  //validate for missing information
  if (!usersIds) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message: "missing information. Needs: usersIds",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_lfg");
    const result = await db
      .collection("users")
      .find({ _id: { $in: usersIds } })
      .toArray();

    //Validate for no user found. This doesnt work if one user was found but not another or others. A solution should be added at eventually.
    if (result.length < 1) {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "No user with this or these id(s) found",
      });
    }

    //clean up sensitive information
    let cleanedResult = [...result]
    cleanedResult.forEach((user)=> {
      delete user.email
      delete user.password
      delete user.friends.sent
      delete user.friends.received
    })

    response
      .status(200)
      .json({ status: 200, data: cleanedResult, message: "success" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = getUsers;
