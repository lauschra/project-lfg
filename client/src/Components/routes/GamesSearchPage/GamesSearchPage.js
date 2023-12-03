import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";
import { useState } from "react";
import GamesSearchListItem from "./GamesSearchListItem";

const GamesSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const searchSubmitHandler = () => {
    event.preventDefault();
    console.log(searchQuery);
    fetch(`/get-games-search/${searchQuery}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      });
  };

  return (
    <SearchPageWrapperDiv>
      <Navbar />
      <p>Games Search</p>
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
  & > form > button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
  }
`;
