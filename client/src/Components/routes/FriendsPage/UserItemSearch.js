import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { UserContext } from "../../Reused/UserContext";
import { useContext, useState } from "react";



const UserItemSearch = ({ userFound }) => {
  const {user, setUser} = useContext(UserContext)
  const avatar = avatarIcons.find((icon) => icon.name === userFound.profile.avatar)

  //work around for user items not disapearing after adding, removing. The logic should be reworked to make the UI update with the user state.
  const [isVisible, setIsVisible] = useState(true)
  
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
        setIsVisible(false)
        } else{
          console.log(response.message);
        }
      });
  };

  return (
    isVisible && <StyledLi>
      <img src={avatar.src} />
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
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content:center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  background-color: var(--lightgray);
  & span {
    font-size: 1.5em;
  }
  & img {
    width: 50px;
  }
  & button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
  }
`;