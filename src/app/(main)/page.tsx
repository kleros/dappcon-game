"use client";
import styled from "styled-components";
export default function Home() {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  `;
  return (
    <Container>
      <h2>Welcome Screen</h2>
    </Container>
  );
}
