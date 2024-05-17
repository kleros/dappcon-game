"use client";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { isAddress } from "viem";
import RewardsIcon from "@/assets/rewards.svg";
import RewardsDarkIcon from "@/assets/rewards-dark.svg";
import { darkTheme } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import LabeledInput from "@/components/LabeledInput";
import useClaimReward from "@/hooks/useClaimReward";
import { isGameConcluded } from "@/lib/game.config";
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

interface UserItem {
  username: string;
  connections: number;
  points: number;
  token: number;
  rank: number;
}

const ClaimReward: React.FC<ClaimRewardProps> = ({ setClaimed }) => {
  const [address, setAddress] = useState<string>("");
  const { isLoading, claimReward } = useClaimReward();
  const gameConcluded = useMemo(() => isGameConcluded(), []);

  const { isPending, data } = useQuery<UserItem>({
    queryKey: ["userstats"],
  });

  const handleClaim = async () => {
    if (!isAddress(address.toLowerCase())) {
      toast.error("Invalid address");
      return;
    }
    try {
      await claimReward(address);
      setClaimed(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Heading>Claim my Rewards</Heading>
      <TableContainer>
        <TableCellWrapper rankHeader>
          <TableCell>Rankings</TableCell>
        </TableCellWrapper>
        <TableCellWrapper isGameConcluded={gameConcluded}>
          <TableCell>Connections</TableCell>
          {gameConcluded && <TableCell>Pts.</TableCell>}
          <TableCell>
            Est. <RewardsIcon />
          </TableCell>
        </TableCellWrapper>
      </TableContainer>
      <UserPoints />
      <ClaimAmount>{!isPending && <>Amount: {data?.token} PNK</>}</ClaimAmount>
      <ClaimSection>
        Type the address you want to receive the rewards
        <LabeledInput
          label="Gnosis Chain Address"
          placeholder="0x1234...5432"
          onChange={(e) => setAddress(e.target.value)}
        />
        <StyledLinkButton
          disabled={isLoading}
          Icon={RewardsDarkIcon}
          onClick={handleClaim}
          text={isLoading ? "Submitting..." : "Submit Address"}
        />
      </ClaimSection>
    </Container>
  );
};

export default ClaimReward;
