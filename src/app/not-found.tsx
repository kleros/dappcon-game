"use client";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <h2> ¯\_( ͡° ͜ʖ ͡°)_/¯</h2>
      <h2>Justice not found here</h2>
    </Container>
  );
};

export default NotFound;
