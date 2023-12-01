import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const testImage = avatarIcons[3];

const UserItemReceived = ({ userFound }) => {
  const { user, setUser } = useContext(UserContext);

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
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          //add to list and remove from received
          const index = user.friends.received.indexOf(userFound._id);
          const newArray = [...user.friends.received];
          newArray.splice(index, 1);
          setUser({
            ...user,
            friends: {
              ...user.friends,
              received: newArray,
              list: [...user.friends.list, userFound._id],
            },
          });
        } else {
          console.log(response.message);
        }
      });
  };

  return (
    <StyledLi>
      <img src={testImage.src} />
      {userFound.userName}
      <button onClick={addSubmitHandler}>accept</button>
      <button>deny</button>
    </StyledLi>
  );
};

export default UserItemReceived;

const StyledLi = styled.li`
  padding: 5px;
  gap: 5px;
  font-size: 1.25em;
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
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
