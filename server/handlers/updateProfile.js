"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const updateProfile = async (request, response) => {
  const {
    userId,
    newUserName,
    newEmail,
    currentPassword,
    newPassword,
    newPlatforms,
    newTags,
    newAvailabilities,
  } = request.body;

  //validate for correct key naming or missing information
  if (
    !userId ||
    !newUserName ||
    !newEmail ||
    !currentPassword ||
    !newPlatforms ||
    !newTags ||
    !newAvailabilities
  ) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message:
        "missing information. Need: newUserName, newEmail, currentPassword, newPassword, newRealName, newPlatforms, newTags",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
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

    //validate if current password match
    if (userDocument.password !== currentPassword) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "current password don't match",
      });
    }

    //validate for email availability
    const foundEmail = await db.collection("users").findOne({ email: newEmail.toLowerCase() });
    if(userDocument.email !== newEmail.toLowerCase() && foundEmail){
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "This email is already in use",
      });
    }

    //validate for username availability
    const foundUserName = await db.collection("users").findOne({ lowerCaseUserName: newUserName.toLowerCase() });
    if(userDocument.lowerCaseUserName !== newUserName.toLowerCase() && foundUserName){
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "Username already taken",
      });
    }


    //rebuild user document with new infos
    let newUserDocument = { ...userDocument };
    newUserDocument.userName = newUserName;
    newUserDocument.lowerCaseUserName = newUserName.toLowerCase();
    newUserDocument.email = newEmail;
    newUserDocument.password = newPassword ? newPassword : currentPassword;
    newUserDocument.profile.platforms = newPlatforms;
    newUserDocument.profile.tags = newTags;
    newUserDocument.profile.availabilities = newAvailabilities;

    const result = await db
      .collection("users")
      .replaceOne({ _id: userId }, newUserDocument);

    delete newUserDocument.password

    if (result.modifiedCount === 1) {
      response.status(200).json({
        status: 200,
        data: newUserDocument,
        message: "Profile updated successfully",
      });
    } else {
      response.status(404).json({
        status: 404,
        data: request.body,
        message: "Database couldn't be updated",
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

module.exports = updateProfile;
