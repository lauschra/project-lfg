import styled from "styled-components";
import SiteMenu from "./SiteMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <NavbarDiv>
      <SiteMenu />
      <UserMenu />
    </NavbarDiv>
  );
};

export default Navbar;

const NavbarDiv = styled.div`
  box-sizing: border-box;
  background-color: var(--green);
  top: 0;
  padding: 1.5em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  z-index: 1;
  & button {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: transparent;
    border: none;
    color: var(--white);
    font-size: 1em;
  }
  & img {
    filter: invert(100%);
  }
`;
