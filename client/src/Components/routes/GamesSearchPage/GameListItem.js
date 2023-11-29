import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../Reused/UserContext";

const GameListItem = ({ game }) => {
  const { user, setUser } = useContext(UserContext);

  //look for game id in user games
  console.log(user.playingGames);
  let isAdded = user.playingGames.includes(game.id);

  const handleClick = (game) => {
    //add the game into the db
    if (!isAdded) {
      fetch(`/add-game`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          gameId: game.id,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.message);
          if(response.status === 200 || response.status === 201)
          setUser({...user, playingGames: [...user.playingGames, game.id]});
        });
    } else {
      console.log("game removed test");
    }
  };

  //this condition should be changed for a place holder image condition
  if (game.cover) {
    return (
      <ContainerLi $isAdded = {isAdded}>
        <StyledLink onClick={() => handleClick(game)}>
          <img src={game.cover.url} />
          <span>{game.name}</span>
        </StyledLink>
      </ContainerLi>
    );
  }
};

export default GameListItem;

const ContainerLi = styled.li`
    background-color: ${props => props.$isAdded ? "var(--lightgray)" : "none"}
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  & span {
    font-size: 1.5em;
  }
`;
