import UserItemSearch from "./UserItemSearch"
import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const AddFriend = () => {

  const [searchQuery, setSearchQuery] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const searchSubmitHandler = () => {
    event.preventDefault();
    fetch(`/get-users-search/${searchQuery}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setSearchResults(response.data);
        //this needs to have an execption added to prevent the user to find himself and users are already in their friends.
      });
  };

  return (
    <AddTabWrapperDiv>
      <p>Add Friend</p>
      <form><input onChange={(event) => setSearchQuery(event.target.value)}></input>
      <button onClick={searchSubmitHandler} disabled={!searchQuery}>search</button></form>
      <ul>
      {searchResults.map((userFound) => {
        return <UserItemSearch key={userFound._id} userFound={userFound} searchResults={searchResults}/>
      })}
      </ul>
    </AddTabWrapperDiv>
  );
}
export default AddFriend

const AddTabWrapperDiv = styled.div`
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
