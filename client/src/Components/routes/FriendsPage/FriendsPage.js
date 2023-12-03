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
          <button className="friends" onClick={()=>setTab("friends")}>Friends</button>
          <button className="add" onClick={()=>setTab("add")}>Add</button>
          <button className="pending" onClick={()=>setTab("pending")}>Pending</button>
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
  & .friends {
    background-color:transparent;
    color:var(--white);
    border: 2px solid var(--yellow);
    background-color: var(--gray);
    padding:5px 15px;
    border-radius: 5px;
    border-bottom:none;
  }
  & .add {
    background-color:transparent;
    color:var(--white);
    border: 2px solid var(--green);
    background-color: var(--gray);
    padding:5px 15px;
    border-radius: 5px;
    border-bottom:none;
  }
  & .pending {
    background-color:transparent;
    color:var(--white);
    border: 2px solid var(--red);
    background-color: var(--gray);
    padding:5px 15px;
    border-radius: 5px;
    border-bottom:none;
  }
`;

