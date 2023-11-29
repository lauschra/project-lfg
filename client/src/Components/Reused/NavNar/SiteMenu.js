import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SiteMenu = () => {
  const [openedMenu, setOpenedMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <MenuDiv>
      <button onClick={() => setOpenedMenu(!openedMenu)}>
        <img src="./img/menu-icon.svg" />
        <span>Menu</span>
      </button>
      {openedMenu && (
        <ul>
          <a
            onClick={() => {
              navigate("/my-profile");
              setOpenedMenu(false);
            }}
          >
            Profile
          </a>
          <a
            onClick={() => {
              navigate("/games-search");
              setOpenedMenu(false);
            }}
          >
            Seach games
          </a>
          <a
            onClick={() => {
              navigate("/friends");
              setOpenedMenu(false);
            }}
          >
            Friends
          </a>
        </ul>
      )}
    </MenuDiv>
  );
};

export default SiteMenu;

const MenuDiv = styled.div`
  & ul {
    font-size: 2em;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    top: 2em;
    left: 0;
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
