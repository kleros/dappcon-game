"use client";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { darkTheme } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import { TOKEN_DISTRIBUTION_TIMESTAMP } from "@/lib/game.config";
import { formatNumber } from "@/lib/utils";

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

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.klerosUIComponentsSecondaryBlue};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

interface UserItem {
  username: string;
  connections: number;
  points: number;
  token: number;
  rank: number;
}

const RewardClaimed: React.FC = () => {
  const { isPending, data } = useQuery<UserItem>({
    queryKey: ["userstats"],
  });
  return (
    <Container>
      <StyledText>Well Done!</StyledText>
      <Heading>Address Submitted!</Heading>
      <StyledH2>{!isPending && <>{formatNumber(data?.token!)} PNK</>}</StyledH2>
      <StyledMessage>
        Submitted! You will receive them before{" "}
        {new Date(TOKEN_DISTRIBUTION_TIMESTAMP * 1000).toLocaleDateString(
          "en-US",
          { day: "numeric", month: "long", year: "numeric" }
        )}
        .
      </StyledMessage>
      <StyledLinkButton
        className="marginTop"
        url="/leaderboard"
        text="Return"
      />
      <Note>
        The PNK shown is just an estimate, the true value will depend on your
        performance
      </Note>
    </Container>
  );
};

export default RewardClaimed;
