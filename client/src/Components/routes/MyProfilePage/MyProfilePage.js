import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Reused/UserContext";
import { useNavigate } from "react-router-dom";


const testImage = avatarIcons[3];

const MyProfilePage = () => {
  const { user, storedUser } = useContext(UserContext);
  const navigate = useNavigate()

  //navigate to login page if no user logged in
  useEffect(() => {
    !storedUser && navigate("/");
  });

  if(!user)return <p>Loading...</p>
  return (
    <>
      <Navbar />
      <ProfileWrapperDiv>
        <ProfileInfosDiv>
          <img src={testImage.src} />
          <h3>{user.userName}</h3>
          <div>
            <p>Member since: nov. 2023</p>
            <p>Platforms: PC, Playstation 4</p>
            <p>Availabilities: Week nights, Weekends</p>
            <p>Real name: Bimmy Bimston</p>
            <p>Tags: Casual, RPG, MMO, Adventure</p>
          </div>
        </ProfileInfosDiv>
        <PlayingGamesDiv>
          <h3>Currently playing:</h3>
          {user.playingGames.map((game)=>{
            return <p>{game.title}</p>
          })}
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
  padding:1em;
  margin:10%;
  background-color: var(--gray);
  display:flex;
  flex-direction:column;
  align-items:center;
  & img {
    width:20%;
  }
  & p {
    border-bottom: 1px dotted var(--white)
  }
`;

const PlayingGamesDiv = styled.div`
`