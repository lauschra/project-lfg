import UserListItem from "./UserListItem"
import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const AddFriend = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const searchSubmitHandler = () => {
    fetch(`/get-users/${searchQuery}`, {
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
    <AddTabWrapperDiv>
      <p>Add Friend</p>
      <input onChange={(event) => setSearchQuery(event.target.value)}></input>
      <button onClick={searchSubmitHandler}>search</button>
      <ul>
      {searchResults.map((user) => {
        return <UserListItem key={user._id} user={user}/>
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
`;
