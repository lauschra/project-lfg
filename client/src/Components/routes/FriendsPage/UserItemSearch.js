import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { UserContext } from "../../Reused/UserContext";
import { useContext } from "react";

const testImage = avatarIcons[3];


const UserItemSearch = ({ userFound }) => {
  const {user, setUser} = useContext(UserContext)
  
  const addSubmitHandler = () => {
    fetch(`/add-friend`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        friendId: userFound._id,
      })
    })
    .then((res) => res.json())
    .then((response) => {
      if(response.status === 200 || response.status === 201){
        setUser({ ...user, friends: {...user.friends, sent: [...user.friends.sent, userFound._id]} });
        } else{
          console.log(response.message);
        }
      });
  };

  return (
    <StyledLi>
      <img src={testImage.src} />
      {userFound && userFound.userName}
      <button onClick={addSubmitHandler}>send request</button>
    </StyledLi>
  );
};

export default UserItemSearch;

const StyledLi = styled.li`
  padding: 5px;
  gap:5px;
  font-size:1.25em;
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content:center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  & span {
    font-size: 1.5em;
  }
  & img {
    width: 50px;
  }
`;