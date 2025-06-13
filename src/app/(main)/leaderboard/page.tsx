"use client";
import React, { useMemo } from "react";
import styled from "styled-components";
import RewardsIcon from "@/assets/rewards-dark.svg";
import LightLinkButton from "@/components/LightLinkButton";
import { isGameEnded, isGameConcluded } from "@/lib/game.config";
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

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.klerosUIComponentsSecondaryBlue};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
  margin-top: 28px;
`;

const Leaderboard: React.FC = () => {
  const gameEnded = useMemo(() => isGameEnded(), []);
  const gameConcluded = useMemo(() => isGameConcluded(), []);
  return (
    <Container>
      <Heading>Leaderboard</Heading>
      <Table />
      <UserPoints />
      <Note>
        The PNK shown is just an estimate, the true value will depend on your
        performance
      </Note>
      {
        gameConcluded
          ? null
          : (
            <StyledLinkButton
              url={gameEnded ? "/leaderboard/claim" : "/"}
              Icon={gameEnded && RewardsIcon}
              text={gameEnded ? "Claim my Rewards" : "Return"}
            />
          )
      }
    </Container>
  );
};

export default Leaderboard;
