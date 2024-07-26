import React from "react";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Container>
          <Row>
            <pre>
              <div>Main function:</div>
              <ul>
                <li>Login/Logout</li>
                <li>Authenticator/Authorization</li>
                <li>CRUD</li>
                <li>Import/Export file</li>
              </ul>
            </pre>
          </Row>
          <Row>
            <pre>
              <div>Technologies:</div>
              <ul>
                <li>React-Bootstrap</li>
                <li>Redux</li>
                <li>SCSS</li>
              </ul>
            </pre>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
