import styled from "styled-components";
import { useState, useEffect } from "react";

import Login from "./Login";
import Signup from "./Signup";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);

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
`;
