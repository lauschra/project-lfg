"use strict";

const access_token = "gr9k46d9cvznckllnfn0ij8ngjq3ki";
const token_type = "bearer";

require("dotenv").config();

const { CLIENT_ID } = process.env;

const url = "https://api.igdb.com/v4/games";

const getGames = async (request, response) => {
  const { gamesIds } = request.body;

  //validate for incorrect or missing information
  if (!gamesIds || !gamesIds) {
    return response.status(400).json({
      status: 400,
      data: request.params,
      message: "invalide or missing information",
    });
  }

  if(gamesIds.length < 1){
    return response.status(404).json({
      status: 404,
      data: request.params,
      message: "no game IDs in the user array",
    });
  }

  //turn the array into a string for the API request
  const stringifiedgamesIds = gamesIds.join();

  const fetchBody = `fields name, cover.url, platforms.name, first_release_date; where id = (${stringifiedgamesIds});`;

  try {
    let apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Client-ID": CLIENT_ID,
        Authorization: `${token_type} ${access_token}`,
      },
      body: fetchBody,
    });
    apiResponse = await apiResponse.json();
    response
      .status(200)
      .json({ status: 200, data: apiResponse, message: "success" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  }
};

module.exports = getGames;
