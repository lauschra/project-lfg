import Navbar from "../../Reused/Navbar/Navbar";
import styled from "styled-components";
import { useState } from "react";
import GamesSearchListItem from "./GamesSearchListItem";

const GamesSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const searchSubmitHandler = () => {
    event.preventDefault();
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
      <h3>Games Search</h3>
      <form><input onChange={(event) => setSearchQuery(event.target.value)}></input>
      <button onClick={searchSubmitHandler} disabled={!searchQuery}>Search</button></form>
      <ul>
      {searchResults.map((game) => {
        return <GamesSearchListItem key={game.id} game={game}/>
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
  margin-bottom:10px;
  & > form > button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
  }
`;
