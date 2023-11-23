"use strict";

const { MONGO_URI } = process.env;

const client_id = "59f2nv46qhmqvr2n2koc75r7oaer8s";
const client_secret = "lijgpoxs2eos5l212qa2q7bs9rfa8s";
const url = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`;

const getTwitchAuthentification = async (request, response) => {
  try {
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json()
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
