"use strict";

const access_token = "st106uwv16ntmdvbhuyqbl9wevsouu";
const token_type = "bearer";
const client_id = "59f2nv46qhmqvr2n2koc75r7oaer8s";

const url = "https://api.igdb.com/v4/games"

const fetchBody = `search "Halo"; fields name, cover.url , platforms.name, platforms.platform_family.name; limit 50;`


const getGames = async (request, response) => {
  try {
    let apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Client-ID": client_id,
        "Authorization": `${token_type} ${access_token}`
      },
      body: fetchBody
    });
    apiResponse = await apiResponse.json();

    response.status(200).json({ status: 200, data: {apiResponse}, message: "success" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  }
};

module.exports = getGames;
