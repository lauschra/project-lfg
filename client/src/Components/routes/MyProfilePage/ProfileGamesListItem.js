import styled from "styled-components";

const ProfileGamesListItem = ({game}) => {

  //change the size of the image with the url naming. See the API's doc for more on how this workds
  const imgUrl = game.cover.url.replace("thumb", "cover_small")

  return <StyledLi>
    <img src={imgUrl} />
    {game.name}
    </StyledLi>
}

export default ProfileGamesListItem

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid var(--lightgray);
  & span {
    font-size: 1.5em;
  }
`;