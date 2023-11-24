import Navbar from "../../Reused/NavNar/Navbar";
import styled from "styled-components";

const MyProfilePage = () => {
  return (
    <Container>
      <Navbar />
      <p>My profile page</p>
    </Container>
  );
};

export default MyProfilePage;

const Container = styled.div`
  margin-top:5.5em;
`