"use client";
import React from "react";
import styled from "styled-components";
import QR from "@/assets/qr.svg";
import LightLinkButton from "@/components/LightLinkButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledQR = styled(QR)`
  align-self: center;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledText = styled.p`
  font-weight: 400;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Heading>Kleros Schelling Game</Heading>
      <ScannerContainer>
        <StyledText>Scan another player</StyledText>
        <StyledLinkButton url="/4654v45e454" text="Scan" />
      </ScannerContainer>
      <ScannerContainer>
        <StyledText>My QR</StyledText>
        <StyledQR />
      </ScannerContainer>
    </Container>
  );
};

export default Home;
