"use client";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <h2>Welcome Screen</h2>
    </Container>
  );
};

export default Home;
