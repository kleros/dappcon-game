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

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.klerosUIComponentsSecondaryBlue};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const StyledDiv = styled.div`
  margin-top: 28px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Leaderboard: React.FC = () => {
  const gameEnded = useMemo(() => isGameEnded(), []);
  return (
    <Container>
      <Heading>Leaderboard</Heading>
      <Table />
      <UserPoints />
      <Note>
        The PNK shown is just an estimate, the true value will depend on your
        performance
      </Note>
      <StyledDiv>
        <StyledLinkButton
          url={gameEnded ? "/leaderboard/claim" : "/"}
          Icon={gameEnded && RewardsIcon}
          text={gameEnded ? "Claim my Rewards" : "Return"}
        />
        {
          gameEnded
            ? (
              <StyledLinkButton
                url="https://cdn.kleros.link/ipfs/QmQx3abvPopY7oWKn8QjLrQXUQWWWuvwehUbLBDz7Kkzva"
                text="Check the answers!"
                target="_blank"
                rel="noopener"
              />
            )
            : null
        }
      </StyledDiv>
    </Container>
  );
};

export default Leaderboard;
