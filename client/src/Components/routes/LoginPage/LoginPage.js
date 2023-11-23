import styled from "styled-components"

import Login from "./Login"
import Signin from "./Signin"

const LoginPage = () =>{
  return <Container>
    <h1>PROJECT LFG</h1>
    <h2>Welcome! Please log in.</h2>
    <Login />
    <Signin />
    <p>No account yet?</p>
    <button>Sign in</button>
  </Container>
}

export default LoginPage

const Container = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

