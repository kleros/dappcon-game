"use client";
import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 28px;
`;

const Points = styled.p`
  color: ${darkTheme.klerosUIComponentsSecondaryPurple};
  font-weight: 600;
  font-size: 64px;
  padding: 20px;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
  margin-top: 28px;
`;

const Solved: React.FC = () => {
  return (
    <Container>
      <StyledText>Well Done!</StyledText>
      <Heading>Connection completed!</Heading>
      <Points>+1</Points>
      <StyledText>
        Connect with more people, and answer the questions to increase your
        chances of winning the rewards.
      </StyledText>
      <StyledLinkButton url="/" text="Continue" />
    </Container>
  );
};

export default Solved;
