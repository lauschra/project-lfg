import styled from "styled-components";
import { avatarIcons } from "../../../data";
import { useNavigate } from "react-router-dom";

const UserItemFriends = ({ user }) => {
  const avatar = avatarIcons.find((icon) => icon.name === user.profile.avatar)
  const navigate = useNavigate()
  return (
    <StyledLi>
      <img src={avatar.src} />
      {user.userName}
      <button onClick={()=>navigate(`/others-profile/${user._id}`)}>profile</button>
    </StyledLi>
  );
};

export default UserItemFriends;

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
