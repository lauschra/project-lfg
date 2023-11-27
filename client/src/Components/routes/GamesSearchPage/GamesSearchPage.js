import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../../Reused/UserContext";
import GameListItem from "./GameListItem";

const GamesSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const searchSubmitHandler = () => {
    fetch(`/get-games-search/${searchQuery}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setSearchResults(response.data);
      });
  };

  return (
    <SearchPageWrapperDiv>
      <Navbar />
      <p>Games Search</p>
      <input onChange={(event) => setSearchQuery(event.target.value)}></input>
      <button onClick={searchSubmitHandler}>search</button>
      <ul>
      {searchResults.map((game) => {
        return <GameListItem key={game.id} game={game}/>
      })}
      </ul>
    </SearchPageWrapperDiv>
  );
};

export default GamesSearchPage;

const SearchPageWrapperDiv = styled.div`
  margin-top: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
