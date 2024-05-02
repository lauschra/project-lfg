"use strict";

const access_token = "gr9k46d9cvznckllnfn0ij8ngjq3ki";
const token_type = "bearer";

require("dotenv").config();

const { CLIENT_ID } = process.env;

const url = "https://api.igdb.com/v4/games"

//at some point this should handle a POST request with more filtering options coming from the FE. Ex: Selected platforms (PC, PS5, PS4, XBOX one, etc)
const getGamesSearch = async (request, response) => {
  const {query} = request.params

  //validate for valid query
  if(!query){
    return response.status(400).json({
      status: 400,
      data: request.params,
      message: "invalide information",
    });
  }
  
  //theres quite a few filtering options involved here. See the API's doc for explainations
  const fetchBody = `search "${query}"; fields name, cover.url, platforms.name, platforms.platform_family.name; limit 100; where category = (0, 2, 4, 5, 8, 9) & version_parent = null & platforms.category = (1,4,6);`

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
    })
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
