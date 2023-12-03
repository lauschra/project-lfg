import styled from "styled-components";
import Navbar from "../../Reused/NavNar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Reused/UserContext";
import { avatarIcons } from "../../../data";

const ProfileSettings = () => {
  const { user, setUser, storedUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null)

  const [formData, setFormData] = useState({
    userId : user._id,
    newUserName: user.userName,
    newEmail: user.email,
    currentPassword: null,
    newPassword: null,
    newPlatforms: user.profile.platforms,
    newTags: user.profile.tags,
    newAvailabilities: user.profile.availabilities,
    newAvatar: user.profile.avatar
  });

  const [isChanging, setIsChanging] = useState({
    userName: false,
    email: false,
    password: false,
    platforms: false,
    tags: false,
    availabilities: false,
    avatar: false
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

    fetch(`/update-profile`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setUser(response.data);
          setErrorMessage("Changes saved!")
          setIsChanging({
            userName: false,
            email: false,
            password: false,
            platforms: false,
            tags: false,
            availabilities: false
        })
        } else {
          console.log(response.message);
          setErrorMessage(response.message)
        }
      });
  }

  const avatar = avatarIcons.find((icon) => icon.name === user.profile.avatar)

  return <>
  <Navbar/>
  <SettingsWrapperDiv>
    <InfoFormDiv onSubmit={updateSettingsSubmitHandler}>
    <h3 htmlFor="avatar">Avatar:</h3>
    {!isChanging.avatar && <><img src={avatar.src}/><span><button onClick={() => setIsChanging({...isChanging, avatar: true})}>change</button></span></>}
        {isChanging.avatar && <select
          id="avatar"
          name="newAvatar"
          onChange={handleChange}
        >
              <option value="controller1">Controller</option>
              <option value="gameboy1">GameBoy</option>
              <option value="gamepad1">GamePad</option>
              <option value="gearStick1">Gear Stick</option>
              <option value="ghost1">Ghost</option>
              <option value="jet1">Jet</option>
              <option value="mushroom1">Mushroom</option>
              <option value="spaceship1">Spaceship</option>
              <option value="stamp1">Stamp</option>
              <option value="sword1">Sword 1</option>
              <option value="sword2">Sword 2</option>
              <option value="tetris1">Tetris</option>
              <option value="console1">Console</option>
          </select>}
        <br />
    <h3 htmlFor="userName">Username:</h3>
    {!isChanging.userName && <span>{user.userName} <button onClick={() => setIsChanging({...isChanging, userName: true})}>change</button></span>}
        {isChanging.userName && <input
          type="text"
          id="userName"
          name="newUserName"
          value={formData.newUserName}
          onChange={handleChange}
        ></input>}
        <br />

    <h3 htmlFor="email">Email:</h3>
    {!isChanging.email && <span>{user.email}<button onClick={() => setIsChanging({...isChanging, email: true})}>change</button></span>}
        {isChanging.email && <input
          type="email"
          id="email"
          name="newEmail"
          value={formData.newEmail}
          onChange={handleChange}
        ></input>}
        <br />

        <h3 htmlFor="newPassword">Password:</h3>
        {!isChanging.password && <button onClick={() => setIsChanging({...isChanging, password: true})}>change</button>}
        {isChanging.password && <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={handleChange}
        ></input>}
        <br />
        
        {/* all these checkbox inputs are not working yet. */}
        <h3>Platforms:</h3>
        {!isChanging.platforms && <span>{user.profile.platforms && user.profile.platforms.join(", ")}<button onClick={() => setIsChanging({...isChanging, platforms: true})}>change</button></span>}
        {isChanging.platforms && <><span><label htmlFor="xbox">Xbox</label>
        <input
          type="checkbox"
          id="xbox"
          value="xbox"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="computer">Computer</label>
        <input
          type="checkbox"
          id="computer"
          value="computer"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="playstation">Playstation</label>
        <input
          type="checkbox"
          id="playstation"
          value="playstation"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="nintendo">Nintendo</label>
        <input
          type="checkbox"
          id="nintendo"
          value="nintendo"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span></>}
        <br />
        

        <h3 htmlFor="tags">Tags:</h3>
        {!isChanging.tags && <span>{user.profile.tags && user.profile.tags.join(", ")}<button onClick={() => setIsChanging({...isChanging, tags: true})}>change</button></span>}
        {isChanging.tags && <><span><label htmlFor="casual">Casual</label>
        <input
          type="checkbox"
          id="casual"
          value="casual"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="competitive">Competitive</label>
        <input
          type="checkbox"
          id="competitive"
          value="competitive"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="shooter">Shooter</label>
        <input
          type="checkbox"
          id="shooter"
          value="shooter"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="adventure">Adventure</label>
        <input
          type="checkbox"
          id="adventure"
          value="adventure"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
          <span><label htmlFor="mmo">MMO</label>
        <input
          type="checkbox"
          id="mmo"
          value="mmo"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
          <span><label htmlFor="moba">MOBA</label>
        <input
          type="checkbox"
          id="moba"
          value="moba"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span>
          <span><label htmlFor="strategy">Strategy</label>
        <input
          type="checkbox"
          id="strategy"
          value="strategy"
          name="newPlatforms"
          // onChange={handleChange}
        ></input></span></>}
        <br />

        <h3 htmlFor="availabilities">Availabilities:</h3>
        {!isChanging.availabilities && <span>{user.profile.availabilities && user.profile.availabilities.join(", ")}<button onClick={() => setIsChanging({...isChanging, availabilities: true})}>change</button></span>}
        {isChanging.availabilities && <><span><label htmlFor="weekends day">Weekends day</label>
        <input
          type="checkbox"
          id="weekends day"
          value="weekends day"
          name="newAvailabilities"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="weekends night">Weekends night</label>
        <input
          type="checkbox"
          id="weekends night"
          value="weekends night"
          name="newAvailabilities"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="weekends day">Week days day</label>
        <input
          type="checkbox"
          id="week days day"
          value="week days day"
          name="newAvailabilities"
          // onChange={handleChange}
        ></input></span>
        <span><label htmlFor="weekends day">Week days night</label>
        <input
          type="checkbox"
          id="week days night"
          value="week days night"
          name="newAvailabilities"
          // onChange={handleChange}
        ></input></span></>}
        <br />

        <label htmlFor="currentPassword">Confirm with your current password</label>
        <input
          required
          type="password"
          id="currentPassword"
          name="currentPassword"
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
  min-width: 70vw;
  padding: 1em;
  margin: 10%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 20%;
    margin-bottom: 10px;
  }
  & button {
    border:none;
    background-color: var(--yellow);
    color:var(--black);
    padding: 3px 10px;
    border-radius: 5px;
    margin-left: 10px;
  }
  & h3 {
    margin-bottom: 10px;
  }
`;