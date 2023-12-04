import styled from "styled-components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const OthersGames = ({ targetUser }) => {
  const [apisGameList, setApisGameList] = useState(null);
  const {user} = useContext(UserContext)

  
  useEffect(() => {
    fetch(`/get-games`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamesIds: targetUser.playingGames,
      }),
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        setApisGameList(response.data);
      } else {
        console.log(response.message);
      }
    });
  }, []);
  
  return (
    <ul>
      {apisGameList ? (
        <>
          {apisGameList.map((game) => {
            //change the size of the image with the url naming. See the API's doc for more on how this workds
            const imgUrl = game.cover.url.replace("thumb", "cover_small");

            //check if user have this game in common
            let foundMatch = false
            if(user.playingGames.includes(game.id)){
              foundMatch = true
            }

            return (
              <StyledLi key={game.id}>
                <img src={imgUrl} />
                <span>{game.name}</span>
                {foundMatch && <p>You also play this game</p>}
              </StyledLi>
            );
          })}
        </>
      ) : targetUser.playingGames.length < 1 ? (
        <p>This user doesn't have any games yet</p>
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default OthersGames;

const StyledLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  width: 80vw;
  & span {
    font-size: 1.5em;
    margin-left:10px;
  }
  & p {
    position: absolute;
    bottom: -10px;
    right: 5px;
    font-size: 0.9em;
  }
  
`;

