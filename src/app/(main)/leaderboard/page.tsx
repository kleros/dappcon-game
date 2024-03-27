"use client";
import React from "react";
import styled from "styled-components";
import RewardsIcon from "@/assets/rewards-dark.svg";
import LightLinkButton from "@/components/LightLinkButton";
import { leaderboardData, userData } from "@/consts/dummy-data";
import Table from "./Table";
import UserPoints from "./UserPoints";

const Leaderboard: React.FC = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0 10px;
    text-align: center;
    font-weight: 200;
    gap: 20px;
    .button {
      padding: 10px;
    }
  `;

  const Heading = styled.h2`
    font-weight: 400;
  `;

  const StyledLinkButton = styled(LightLinkButton)`
    width: 100%;
    margin-top: 28px;
  `;

  return (
    <Container>
      <Heading>Leaderboard</Heading>
      <Table LeaderboardData={leaderboardData} />
      <UserPoints {...userData} />
      <div className="button">
        <StyledLinkButton
          url="/leaderboard/claim"
          Icon={RewardsIcon}
          text="Claim my Rewards"
        />
      </div>
    </Container>
  );
};

export default Leaderboard;
