"use client";
import React, { useMemo } from "react";
import styled from "styled-components";
import RewardsIcon from "@/assets/rewards-dark.svg";
import LightLinkButton from "@/components/LightLinkButton";
import { isGameEnded } from "@/lib/game.config";
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
  const gameEnded = useMemo(() => isGameEnded(), []);
  return (
    <Container>
      <Heading>Leaderboard</Heading>
      <Table />
      <UserPoints />
      <StyledLinkButton
        url={gameEnded ? "/leaderboard/claim" : "/"}
        Icon={gameEnded && RewardsIcon}
        text={gameEnded ? "Claim my Rewards" : "Return"}
      />
    </Container>
  );
};

export default Leaderboard;
