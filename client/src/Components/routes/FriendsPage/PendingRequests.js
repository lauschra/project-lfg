import UserItemReceived from "./UserItemReceived";
import UserItemSent from "./UserItemSent";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Reused/UserContext";


const PendingRequests = () => {
  const { user, setUser } = useContext(UserContext);

  const [usersInfosReceived, setUsersInfosReceived] = useState(null);
  const [usersInfosSent, setUsersInfosSent] = useState(null);

  //I know this isnt DRY. I'll refactor when I'll have the time for it
  useEffect(() => {
    fetch(`/get-users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersIds: user.friends.received,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setUsersInfosReceived(response.data);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  //I know this isnt DRY. I'll refactor when I'll have the time for it
  useEffect(() => {
    fetch(`/get-users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersIds: user.friends.sent,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setUsersInfosSent(response.data);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  return (
    <PendingTabWrapperDiv>
      <p>Pending Requests</p>
      <p>Received</p>
      <ul>
      {usersInfosReceived && usersInfosReceived.map((user) => {
        return <UserItemReceived key={user._id} user={user} />
      })}
      </ul>
      <p>Sent</p>
      <ul>
      {usersInfosSent && usersInfosSent.map((user) => {
        return <UserItemSent key={user._id} user={user} />
      })}
      </ul>
    </PendingTabWrapperDiv>
  );
}
export default PendingRequests

const PendingTabWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;