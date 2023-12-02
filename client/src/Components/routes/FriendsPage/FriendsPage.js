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
          <button onClick={()=>setTab("friends")}>Friends</button>
          <button onClick={()=>setTab("add")}>Add</button>
          <button onClick={()=>setTab("pending")}>Pending</button>
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

