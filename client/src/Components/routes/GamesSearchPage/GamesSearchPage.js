import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { useState } from "react";
import GamesSearchListItem from "./GamesSearchListItem";

const GamesSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

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
`;
