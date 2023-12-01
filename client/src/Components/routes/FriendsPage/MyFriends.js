import UserItemFriends from "./UserItemFriends";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Reused/UserContext";

const MyFriends = () => {

  const { user, setUser } = useContext(UserContext);

  const [usersInfos, setUsersInfos] = useState(null);

  useEffect(() => {
    fetch(`/get-users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersIds: user.friends.list,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setUsersInfos(response.data);
        } else {
          console.log(response.message);
        }
      });
  }, []);

  return (
    <FriendTabWrapperDiv>
      <p>My Friends</p>
      <ul>
      {usersInfos && usersInfos.map((user) => {
        return <UserItemFriends key={user._id} user={user} />
      })}
      </ul>
    </FriendTabWrapperDiv>
  );
}
export default MyFriends

const FriendTabWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;