"use client";
import React from "react";
import styled from "styled-components";
import Divider from "@/assets/divider.svg";
import LabeledInput from "@/components/LabeledInput";
import LightLinkButton from "@/components/LightLinkButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Heading = styled.div`
  h2:first-child {
    font-weight: 200;
  }

  h2:last-child {
    font-weight: 400;
  }
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledDivider = styled(Divider)<{ top?: boolean; bottom?: boolean }>`
  margin: ${({ top }) => (top ? "0 0 20px" : "20px 0 0")};
  transform: ${({ bottom }) =>
    bottom ? "rotateY(180deg) rotateX(180deg)" : "none"};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

interface WelcomeProps {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Welcome: React.FC<WelcomeProps> = ({ setAuthenticated }) => {
  const handleStart = (): void => {
    setAuthenticated(true);
  };

  return (
    <Container>
      <Heading>
        <h2>Welcome to</h2>
        <h2>Kleros Schelling Game</h2>
      </Heading>
      <FormContainer>
        <StyledDivider top />
        <StyledText>Type your name to start</StyledText>
        <LabeledInput name="Name" label="Name" placeholder="Bob" />
        <StyledLinkButton text="Start" onClick={handleStart} />
        <StyledDivider bottom />
      </FormContainer>
    </Container>
  );
};

export default Welcome;
