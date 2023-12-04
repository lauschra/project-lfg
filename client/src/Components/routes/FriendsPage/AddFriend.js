import UserItemSearch from "./UserItemSearch"
import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const AddFriend = () => {

  const [searchQuery, setSearchQuery] = useState(null);

  const [searchResults, setSearchResults] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const searchSubmitHandler = () => {
    event.preventDefault();
    setErrorMessage(null)
    setSearchResults(null)
    fetch(`/get-users-search/${searchQuery}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if(response.status === 200 || response.status === 201){
        setSearchResults(response.data);
        //this needs to have an execption added to prevent the user to find himself and users are already in their friends.
      } else {
        setErrorMessage(response.message)
      }
      });
  };

  return (
    <AddTabWrapperDiv>
      <h3>Add Friend</h3>
      <form><input onChange={(event) => setSearchQuery(event.target.value)}></input>
      <button onClick={searchSubmitHandler} disabled={!searchQuery}>search</button></form>
      <ul>
      {searchResults ? searchResults.map((userFound) => {
        return <UserItemSearch key={userFound._id} userFound={userFound} searchResults={searchResults}/>
      }): <span>{errorMessage}</span>}
      </ul>
    </AddTabWrapperDiv>
  );
}
export default AddFriend

const AddTabWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color:var(--white);
  border: 2px solid var(--green);
  padding:5px 15px;
  border-radius:10px;
  min-width:70vw;
  min-height:60vh;
  background-color:var(--gray);
  & > form > button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
    margin-bottom:10px;
  }
  & span {
    color: var(--red);
  }
`;
