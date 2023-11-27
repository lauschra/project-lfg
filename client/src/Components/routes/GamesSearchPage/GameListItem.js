import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const GameListItem = ({ game }) => {
  const {user, setUser} = useContext(UserContext)

  const handleClick = (game)=>{
    console.log(game.name);
  }

  if (game.cover) {
    return <ContainerLi>
      <StyledLink onClick={()=>handleClick(game)}>
      <img src={game.cover.url}/><span>{game.name}</span>
      </StyledLink>
      </ContainerLi>;
  }
};

export default GameListItem;


const ContainerLi = styled.li`
  & :hover, :active{
    background-color:var(--lightgray);
  }
`

const StyledLink = styled.a`
display:flex;
align-items:center;
margin-top: 10px;
border: 1px solid var(--lightgray);
& span {
  font-size:1.5em;
}
`