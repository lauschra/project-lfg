import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Reused/UserContext";
import { useNavigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/my-profile");
  });

  return (
    <Container>
      <h1>PROJECT LFG</h1>
      {showSignup ? (
        <>
          <h2>Create an account!</h2>
          <Signup />
          <p>Already have and account?</p>
          <button onClick={() => setShowSignup(!showSignup)}>Log-in</button>
        </>
      ) : (
        <>
          <h2>Welcome! Please log in.</h2>
          <Login />
          <p>No account yet?</p>
          <button onClick={() => setShowSignup(!showSignup)}>Sign-up</button>
        </>
      )}
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > button {
    background-color: var(--black);
    color: var(--white);
    border: 1px solid var(--white);
    border-radius: 10px;
  }
`;
