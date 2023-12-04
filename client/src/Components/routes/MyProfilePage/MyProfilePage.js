import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Reused/UserContext";
import { useNavigate } from "react-router-dom";
import ProfileGamesListItem from "./ProfileGamesListItem";


const MyProfilePage = () => {
  const { user, storedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const avatar = avatarIcons.find((icon) => icon.name === user.profile.avatar)
  
  //navigate to login page if no user logged in
  useEffect(() => {
    !storedUser && navigate("/");
  });

  const [apisGameList, setApisGameList] = useState(null);

  useEffect(() => {
    fetch(`/get-games`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamesIds: user.playingGames,
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

  if (!user) return <p>Loading...</p>;
  return (
    <>
      <Navbar />
      <ProfileWrapperDiv>
        <ProfileInfosDiv>
          <img src={avatar.src} />
          <h3>{user.userName}</h3>
          <div>
            <p><h4>Member since:</h4> nov. 2023</p>
            <p><h4>Platforms:</h4> {user.profile.platforms && user.profile.platforms.join(", ")}</p>
            <p><h4>Availabilities:</h4> {user.profile.availabilities && user.profile.availabilities.join(", ")}</p>
            <p><h4>Tags:</h4> {user.profile.tags && user.profile.tags.join(", ")}</p>
          </div>
        </ProfileInfosDiv>
        <PlayingGamesDiv>
          <h3>Currently playing:</h3>
          <ul>
            {apisGameList ? (
              <>
                {apisGameList.map((game) => {
                  return <ProfileGamesListItem key={game.id} game={game} />;
                })}
              </>
            ) : user.playingGames.length < 1 ? (
              <p>Go to the search games menu to add games to your profile</p>
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </PlayingGamesDiv>
      </ProfileWrapperDiv>
    </>
  );
};

export default MyProfilePage;

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
  width:70vw;
  & img {
    width: 20%;
  }
  & p {
    border-bottom: 1px dotted var(--white);
  }
  h4 {
    margin-bottom: 5px;
    font-size:1.2em;
  }
  h3 {
    font-size:1.5em;
  }
`;

const PlayingGamesDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  margin-bottom:1em;
`;
