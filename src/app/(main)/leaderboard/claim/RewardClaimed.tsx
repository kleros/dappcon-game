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
  gap: 26px;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledH2 = styled.h2`
  font-weight: 600;
  color: ${darkTheme.klerosUIComponentsSecondaryPurple};
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledMessage = styled(StyledText)`
  margin-top: 36px;
  padding: 10px;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const RewardClaimed: React.FC = () => {
  return (
    <Container>
      <StyledText>Well Done!</StyledText>
      <Heading>Rewards Claimed!</Heading>
      <StyledH2>300PNK</StyledH2>
      <StyledMessage>
        Claimed! Hold on. You will receive them before July 29, 2024.
      </StyledMessage>
      <StyledLinkButton
        className="marginTop"
        url="/leaderboard"
        text="Return"
      />
    </Container>
  );
};

export default RewardClaimed;
