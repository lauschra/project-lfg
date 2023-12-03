import styled from "styled-components";
import Navbar from "../../Reused/NavNar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Reused/UserContext";

const ProfileSettings = () => {
  const { user, storedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({
    userId : user._id,
    newUserName: user.UserName,
    newEmail: user.email,
    currentPassword: null,
    newPassword: null,
    newPlatforms: user.profile.platforms,
    newTags: user.profile.tags,
    newAvailabilities: user.profile.availabilities
  });

  const [isChanging, setIsChanging] = useState({
    userName: false,
    email: false,
    password: false,
    realName: false,
    platforms: false,
    tags: false
})

  //navigate to login page if no user logged in
  useEffect(() => {
    !storedUser && navigate("/");
  });

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const updateSettingsSubmitHandler = (event) => {
    event.preventDefault();

  }

  return <>
  <Navbar/>
  <SettingsWrapperDiv>
    <InfoFormDiv onSubmit={updateSettingsSubmitHandler}>
    <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        ></input>
        <br />
        <button>Save</button>
      {errorMessage && <p style={{color: "var(--red)"}}>{errorMessage}</p>}
    </InfoFormDiv>
  </SettingsWrapperDiv> 
  </>
}

export default ProfileSettings

const SettingsWrapperDiv = styled.div`
  margin-top: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoFormDiv = styled.form`
  border: 2px solid var(--yellow);
  border-radius: 10px;
  padding: 1em;
  margin: 10%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 20%;
  }
  & p {
    border-bottom: 1px dotted var(--white);
  }
`;