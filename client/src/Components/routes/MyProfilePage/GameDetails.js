import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Reused/UserContext";
import Navbar from "../../Reused/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const GameDetails = () => {
  const { gameId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [gameDetails, setGameDetails] = useState(null);
  const [friendsInfos, setFriendsInfos] = useState(null);

  //fetch game info
  useEffect(() => {
    fetch(`/get-games`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamesIds: [gameId],
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setGameDetails(response.data[0]);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  //fetchs users friend infos
  useEffect(() => {
    fetch(`/get-users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersIds: user.friends.list,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setFriendsInfos(response.data);
        } else {
          console.log(response.message);
        }
      });
  }, []);


  let friendsPlaying = []

  if(friendsInfos){
    friendsInfos.forEach(friend => {
      if(friend.playingGames.includes(gameDetails.id)){
        friendsPlaying.push(friend.userName)
      }
    });
  }

  let platforms = []
  let imgUrl = null

  let date = null;
  let year = null;
  let month = null
  let day = null


  if(gameDetails){ 
    imgUrl = gameDetails.cover.url.replace("thumb", "cover_big")
    gameDetails.platforms.forEach(platform => {
      platforms.push(platform.name)
    });
    date = new Date(gameDetails.first_release_date * 1000);
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
  }

  return (
    <>
      <Navbar />
      <Title>Game Details:</Title>
      <GameDetailsDiv>
        {gameDetails && (
          <>
            <h2>{gameDetails.name}</h2>
            <img src={imgUrl}/>
            {<>{friendsPlaying.length > 0 && <h3>Friend(s) playing:</h3>} 
            <p>{friendsPlaying.join(', ')}</p></>}
            <h3>Release date:</h3>
            <p>{year}/{month}/{day}</p>
            <h3>Platforms:</h3>
            <p>{platforms.join(', ')}</p>
          </>
        )}
        <button onClick={() => navigate("/my-profile")}>back</button>
      </GameDetailsDiv>
    </>
  );
};

export default GameDetails;

const GameDetailsDiv = styled.div`
  border: 2px solid var(--yellow);
  border-radius: 10px;
  padding: 1em;
  margin: 10%;
  margin-top:0;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  & > button {
    border: none;
    background-color: var(--yellow);
    color: var(--black);
    padding: 3px 10px;
    border-radius: 5px;
    margin-top: 1em;
  }
  & p{
    margin-top: 0;
  }
  & h3{
    margin-bottom: 10px;
  }
  & img{
    border-radius: 5px;
  }
`;

const Title = styled.h2`
margin-top:10vh;
text-align:center;
`
