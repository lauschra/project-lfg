"use strict";

const access_token = "st106uwv16ntmdvbhuyqbl9wevsouu";
const token_type = "bearer";

require("dotenv").config();

const { CLIENT_ID } = process.env;

const url = "https://api.igdb.com/v4/games"



const getGamesSearch = async (request, response) => {
  const {query} = request.params
  console.log(typeof query);
  
  const fetchBody = `search "${query}"; fields name, cover.url , platforms.name, platforms.platform_family.name; limit 50;`
  try {
    let apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Client-ID": CLIENT_ID,
        "Authorization": `${token_type} ${access_token}`
      },
      body: fetchBody
    });
    apiResponse = await apiResponse.json();

    response.status(200).json({ status: 200, data: apiResponse, message: "success" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  }
};

module.exports = getGamesSearch;
