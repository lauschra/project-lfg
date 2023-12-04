import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OthersGames from "./OthersGames";

const OthersProfilePage = () => {
  const [targetUser, setTargetUser] = useState(null);

  const { targetUserId } = useParams();

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

  if (!targetUser) return <p>Loading...</p>;
  const avatar = avatarIcons.find((icon) => icon.name === targetUser.profile.avatar)
  console.log(avatar);
  return (
    <>
      <Navbar />
      <ProfileWrapperDiv>
        <ProfileInfosDiv>
          <img src={avatar.src} />
          <h3>{targetUser.userName}</h3>
          <div>
            <p><h4>Member since:</h4> nov. 2023</p>
            <p><h4>Platforms:</h4> {targetUser.profile.platforms && targetUser.profile.platforms.join(", ")}</p>
            <p><h4>Availabilities:</h4>{targetUser.profile.availabilities && targetUser.profile.availabilities.join(", ")}</p>
            <p><h4>Tags:</h4> {targetUser.profile.tags && targetUser.profile.tags.join(", ")}</p>
          </div>
        <button>Unfriend</button>
        </ProfileInfosDiv>
        <PlayingGamesDiv>
          <h3>Currently playing:</h3>
          <OthersGames targetUser={targetUser}/>
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
  width:70vw;
  & img {
    width: 20%;
  }
  & p {
    border-bottom: 1px dotted var(--white);
  }
  & button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
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
