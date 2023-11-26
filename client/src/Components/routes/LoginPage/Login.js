import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Reused/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/my-profile");
        } else {
          setErrorMessage(response.message);
        }
      });
  };

  return (
    <LoginForm onSubmit={loginSubmitHandler}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
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
      <button>Log in</button>
      {errorMessage && <p style={{ color: "var(--red)" }}>{errorMessage}</p>}
    </LoginForm>
  );
};

export default Login;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--gray);
  border: 2px solid var(--yellow);
  border-radius: 20px;
  width: 80vw;
  padding: 5%;
  & button {
    background-color: var(--green);
    border: none;
    color: var(--white);
    padding: 0.5em;
    border-radius: 10px;
  }
`;
