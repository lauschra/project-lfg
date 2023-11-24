import styled from "styled-components";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [response, setResponse] = useState({});

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const signupSubmitHandler = (event) => {
    console.log(formData);
    
    event.preventDefault();
    fetch("/create-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data));
  };

  // console.log(response);

  return (
    <SignupBox>
      <form onSubmit={signupSubmitHandler}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="userName">user name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="passwordConfirm">confirm password</label>
        <input type="password" id="passwordConfirm"></input>
        <br />
        <button>Sign-up</button>
      </form>
    </SignupBox>
  );
};

export default Signup;

const SignupBox = styled.div`
  display:flex;
  justify-content:center;
  background-color: var(--gray);
  border: 2px solid var(--yellow);
  border-radius: 20px;
  width: 80vw;
  padding: 5%;
`;
