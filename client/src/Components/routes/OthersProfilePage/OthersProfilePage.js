import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Reused/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ProfileGamesListItem from "../MyProfilePage/ProfileGamesListItem";

const testImage = avatarIcons[3];

const OthersProfilePage = () => {
  const [targetUser, setTargetUser] = useState(null);

  const [apisGameList, setApisGameList] = useState(null);

  const { targetUserId } = useParams();

  const [gamesAreVisible, setGamesAreVisble] = useState(false);

  useEffect(() => {
    fetch(`/get-users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersIds: [targetUserId],
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setTargetUser(response.data[0]);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  const handleShowGames = () => {
    setGamesAreVisble(true);
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
  };

  if (!targetUser) return <p>Loading...</p>;
  return (
    <>
      <Navbar />
      <ProfileWrapperDiv>
        <ProfileInfosDiv>
          <img src={testImage.src} />
          <h3>{targetUser.userName}</h3>
          <div>
            <p>Member since: nov. 2023</p>
            <p>Platforms: PC, Playstation 4</p>
            <p>Availabilities: Week nights, Weekends</p>
            <p>Real name: Bimmy Bimston</p>
            <p>Tags: Casual, RPG, MMO, Adventure</p>
          </div>
        <button>Unfriend</button>
        </ProfileInfosDiv>
        <PlayingGamesDiv>
          <h3>Currently playing:</h3>
          {!gamesAreVisible && <button onClick={handleShowGames}>Show Games</button>}
          {gamesAreVisible && (
            <ul>
              {apisGameList ? (
                <>
                  {apisGameList.map((game) => {
                    return <ProfileGamesListItem key={game.id} game={game} />;
                  })}
                </>
              ) : targetUser.playingGames.length < 1 ? (
                <p>This user doesn't have any games yet!</p>
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          )}
        </PlayingGamesDiv>
      </ProfileWrapperDiv>
    </>
  );
};

export default OthersProfilePage;

const ProfileWrapperDiv = styled.div`
  margin-top: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileInfosDiv = styled.div`
  border: 2px solid var(--yellow);
  border-radius: 10px;
  padding: 1em;
  margin: 10%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 20%;
  }
  & p {
    border-bottom: 1px dotted var(--white);
  }
`;

const PlayingGamesDiv = styled.div``;
