import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useState } from "react";

const testImage = avatarIcons[3];

const UserItemSent = ({ userFound }) => {
  //work around for user items not disapearing after adding, removing. The logic should be reworked to make the UI update with the user state.
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && <StyledLi>
      <img src={testImage.src} />
      {userFound.userName}
      <button>cancel</button>
    </StyledLi>
  );
};

export default UserItemSent;

const StyledLi = styled.li`
  padding: 5px;
  gap: 5px;
  font-size: 1.25em;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
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
