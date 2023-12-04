import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../Reused/UserContext";

const GamesSearchListItem = ({ game }) => {
  const { user, setUser } = useContext(UserContext);

  //flag if the game result is present in the user games
  let isAdded = user.playingGames.includes(game.id);

  const handleClick = (game) => {
    //add the game into the db and context if the game is not already there
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
          if (response.status === 200 || response.status === 201) {
            setUser({ ...user, playingGames: [...user.playingGames, game.id] });
          } else {
            console.log(response.message);
          }
        });

      //remove the game from the db and context if game is not there
    } else {
      fetch(`/remove-game`, {
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
          if (response.status === 200 || response.status === 201) {
            const index = user.playingGames.indexOf(game.id);
            const newArray = user.playingGames;
            newArray.splice(index, 1);
            setUser({ ...user, playingGames: newArray });
          } else {
            console.log(response.message);
          }
        });
    }
  };

  //this condition should be changed for a place holder image condition
  if (game.cover) {
    return (
      //the $ is needed for styled component props passing
      <ContainerLi $isAdded={isAdded}>
        <StyledLink onClick={() => handleClick(game)}>
          <img src={game.cover.url} />
          <span>{game.name}</span>
        </StyledLink>
      </ContainerLi>
    );
  }
};

export default GamesSearchListItem;

const ContainerLi = styled.li`
  width: 90vw;
  border-radius:5px;
  //this is the synthax to use for props in a styled component
  background-color: ${(props) =>
    props.$isAdded ? "var(--lightgray)" : "none"};
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  border-radius:5px;
  & span {
    font-size: 1.5em;
    margin-left:10px;
  }
  & img {
    border-radius:5px;
  }
`;
