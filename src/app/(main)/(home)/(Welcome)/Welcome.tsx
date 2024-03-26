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
  .marginTop {
    margin-top: 36px;
  }
  .padding {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  .divider-flipped {
    transform: rotateY(180deg);
    transform: rotateX(180deg);
  }
  .divider-margin-top {
    margin-top: 20px;
  }
  .divider-margin-bottom {
    margin-bottom: 20px;
  }
`;

const Heading = styled.div`
  .font-200 {
    font-weight: 200;
  }
  .font-400 {
    font-weight: 400;
  }
`;

const StyledText = styled.p`
  font-weight: 200;
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
        <h2 className="font-200">Welcome to</h2>
        <h2 className="font-400">Kleros Schelling Game</h2>
      </Heading>
      <FormContainer>
        <Divider className="divider-margin-bottom" />
        <StyledText>Type your name to start</StyledText>
        <LabeledInput
          className="input"
          name="Name"
          label="Name"
          placeholder="Bob"
        />
        <StyledLinkButton text="Start" onClick={handleStart} />
        <Divider className="divider-flipped divider-margin-top" />
      </FormContainer>
    </Container>
  );
};

export default Welcome;
