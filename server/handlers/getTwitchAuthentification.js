"use strict";

require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

const getTwitchAuthentification = async (request, response) => {
  try {
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    response
      .status(200)
      .json({ status: 200, data: { result }, message: "token received" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  }
};

module.exports = getTwitchAuthentification;
