import styled from "styled-components";
import Navbar from "../../Reused/NavNar/Navbar";
import MyFriends from "./MyFriends";
import AddFriend from "./AddFriend";
import PendingRequests from "./PendingRequests";
import { useState } from "react";

const FriendsPage = () => {
  const [tab, setTab] = useState("friends")
  return (
    <>
      <Navbar />
      <FriendsWrapperDiv>
        <p>Friends page</p>
        <span>
          <button onClick={()=>setTab("friends")}>friends</button>
          <button onClick={()=>setTab("add")}>add friend</button>
          <button onClick={()=>setTab("pending")}>pending request</button>
        </span>
        {tab === "friends" && <MyFriends />}
        {tab === "add" && <AddFriend />}
        {tab === "pending" && <PendingRequests />}
      </FriendsWrapperDiv>
    </>
  );
};

export default FriendsPage;

const FriendsWrapperDiv = styled.div`
  margin-top: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddFriendDiv = styled.div`
  border: 2px solid var(--yellow);
  border-radius: 10px;
  padding: 1em;
  margin: 10%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
