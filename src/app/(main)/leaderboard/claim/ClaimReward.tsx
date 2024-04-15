"use client";
import React from "react";
import styled from "styled-components";
import RewardsIcon from "@/assets/rewards.svg";
import RewardsDarkIcon from "@/assets/rewards-dark.svg";
import { darkTheme } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import LabeledInput from "@/components/LabeledInput";
import { TableContainer, TableCellWrapper, TableCell } from "../Table";
import UserPoints from "../UserPoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 10px;
  text-align: center;
  font-weight: 200;
  gap: 20px;
`;

const ClaimAmount = styled.p`
  color: ${darkTheme.klerosUIComponentsSecondaryPurple};
  font-weight: 600;
`;

const ClaimSection = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
  fill: black;
`;

interface ClaimRewardProps {
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClaimReward: React.FC<ClaimRewardProps> = ({ setClaimed }) => {
  const handleClaim = (): void => {
    setClaimed(true);
  };

  return (
    <Container>
      <Heading>Claim my Rewards</Heading>
      <TableContainer>
        <TableCellWrapper rankHeader>
          <TableCell>Rankings</TableCell>
        </TableCellWrapper>
        <TableCellWrapper>
          <TableCell>Connections</TableCell>
          <TableCell>Pts.</TableCell>
          <TableCell>
            Est. <RewardsIcon />
          </TableCell>
        </TableCellWrapper>
      </TableContainer>
      <UserPoints />
      <ClaimAmount>Amount: 300 PNK</ClaimAmount>
      <ClaimSection>
        Type the address you want to receive the rewards
        <LabeledInput
          label="Gnosis Chain Address"
          placeholder="0x1234...5432"
        />
        <StyledLinkButton
          Icon={RewardsDarkIcon}
          onClick={handleClaim}
          text="Claim"
        />
      </ClaimSection>
    </Container>
  );
};

export default ClaimReward;
