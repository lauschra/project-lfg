import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../../Reused/UserContext";

const ProfileGamesListItem = ({ game }) => {
  const { user, setUser } = useContext(UserContext);

  //This is another work around that should be improved
  const [isVisible, setIsVisible] = useState(true);

  const [friendsPlayingNum, setFriendsPlayingNum] = useState(0);


  //change the size of the image with the url naming. See the API's doc for more on how this workds
  const imgUrl = game.cover.url.replace("thumb", "cover_small");

  const handleClick = () => {
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
          setIsVisible(false);
        } else {
          console.log(response.message);
        }
      });
  };

  //fetch friends games
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
          response.data.forEach(friend => {
            if(friend.playingGames.includes(game.id)){
              console.log("matching game found");
              setFriendsPlayingNum(friendsPlayingNum+1)
            }
          });
        } else {
          console.log(response.message);
        }
      });
  }, [setFriendsPlayingNum]);

  return (
    isVisible && (
      <StyledLi>
        <>
          <img src={imgUrl} />
          <span>{game.name}</span>
        </>
        <button onClick={handleClick}>X</button>
        {friendsPlayingNum > 0 && <p>{friendsPlayingNum} friend(s) playing</p>}
      </StyledLi>
    )
  );
};

export default ProfileGamesListItem;

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
    margin-left: 10px;
  }
  & button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background-color: var(--red);
    color: var(--white);
    padding: 3px 6px;
    border-radius: 5px;
    z-index: 1;
  }
  & p {
    position: absolute;
    bottom: -10px;
    right: 5px;
    font-size: 0.9em;
  }
`;
