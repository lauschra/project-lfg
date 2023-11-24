import styled from "styled-components";
import { useState } from "react";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({});

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    fetch("/get-user-authentification", {
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
    <LoginBox>
      <form onSubmit={loginSubmitHandler}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
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
        <button>Log in</button>
      </form>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.div`
  display:flex;
  justify-content:center;
  background-color: var(--gray);
  border: 2px solid var(--yellow);
  border-radius: 20px;
  width: 80vw;
  padding: 5%;
`;
