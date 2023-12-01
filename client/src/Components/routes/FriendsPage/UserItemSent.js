import styled from "styled-components";
import { avatarIcons } from "../../../data";

const testImage = avatarIcons[3];

const UserItemSent = ({ userFound }) => {
  return (
    <StyledLi>
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
