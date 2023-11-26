import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, setUser } = useContext(UserContext);
  const [openedMenu, setOpenedMenu] = useState(false);
  const navigate = useNavigate();

  //this is not working
  useEffect(() => {
    !user && navigate("/");
  });

  return (
    <MenuDiv>
      <button onClick={() => setOpenedMenu(!openedMenu)}>
        <span>{user.userName}</span>
        <img src="./img/user-icon2.svg" />
      </button>
      {openedMenu && (
        <ul>
          <a>Profile Settings</a>
          <a
            onClick={() => {
              navigate("/");
              setUser(null);
              localStorage.clear();
            }}
          >
            Logout
          </a>
        </ul>
      )}
    </MenuDiv>
  );
};

export default UserMenu;

const MenuDiv = styled.div`
  & ul {
    font-size: 2em;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    top: 2em;
    right: 0;
    background-color: var(--green);
    border-radius: 10px;
  }
  & button:active {
    filter: brightness(80%);
  }
  & a {
    padding: 1em;
  }
  & a:hover,
  a:active {
    filter: brightness(80%);
  }
`;
