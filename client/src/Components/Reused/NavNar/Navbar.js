import { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import SiteMenu from "./SiteMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <NavbarDiv>
      <button>
        <img src="./img/menu-icon.svg" />
        <span>Menu</span>
      </button>
      <button>
        <span>{user.userName}</span>
        <img src="./img/user-icon2.svg" />
      </button>
    </NavbarDiv>
  );
};

export default Navbar;

const NavbarDiv = styled.div`
  box-sizing:border-box;
  background-color: var(--green);
  top:0;
  padding: 1.5em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position:fixed;
  width:100vw;
  z-index: 1000;
  & button {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: transparent;
    border: none;
    color: var(--white);
    font-size:1em;
  }
  & img {
    filter: invert(100%)
  }
`;
