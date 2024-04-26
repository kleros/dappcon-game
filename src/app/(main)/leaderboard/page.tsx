"use client";
import React from "react";
import styled from "styled-components";
import RewardsIcon from "@/assets/rewards-dark.svg";
import LightLinkButton from "@/components/LightLinkButton";
import Table from "./Table";
import UserPoints from "./UserPoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 10px;
  text-align: center;
  font-weight: 200;
  gap: 20px;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
  margin-top: 28px;
`;

const Leaderboard: React.FC = () => {
  return (
    <Container>
      <Heading>Leaderboard</Heading>
      <Table />
      <UserPoints />
      <StyledLinkButton
        url="/leaderboard/claim"
        Icon={RewardsIcon}
        text="Claim my Rewards"
      />
    </Container>
  );
};

export default Leaderboard;
