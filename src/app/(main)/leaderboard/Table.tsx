"use client";
import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import RewardsIcon from "@/assets/rewards.svg";
import { darkTheme } from "@kleros/ui-components-library";
import { Database } from "@/types/supabase";
import { isGameConcluded } from "@/lib/game.config";
import { formatNumber } from "@/lib/utils";

export const TableContainer = styled.div<{ isGameConcluded?: boolean }>`
  display: grid;
  padding: 10px;
  grid-template-columns: ${({ isGameConcluded }) =>
    isGameConcluded ? "1fr 2fr 2fr 1fr 2fr" : "1fr 2fr 1fr 2fr"};
`;

export const TableCell = styled.div<{ rank?: boolean; top?: boolean; align?: "left" | "right" }>`
  padding-bottom: 8px;
  font-weight: ${({ rank }) => (rank ? "600" : "200")};
  color: ${({ rank }) => rank && darkTheme.klerosUIComponentsSecondaryPurple};
  ${({ top }) => top && "grid-column: span 2;"}
  ${({ align }) => align === "left" ? "text-align: left;" : align === "right" ? "text-align: right;" : ""}
`;

type LeaderboardItem = Database["public"]["Tables"]["leaderboard"]["Row"];

const Table: React.FC = () => {
  const gameConcluded = useMemo(() => isGameConcluded(), []);
  const { isPending, error, data } = useQuery<LeaderboardItem[]>({
    queryKey: ["leaderboardData"],
    queryFn: () => fetch("/api/leaderboard").then((res) => res.json()),
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>an error occured</div>;

  return (
    <TableContainer isGameConcluded={isGameConcluded()}>
      <TableCell top={true} align="left">Top Players</TableCell>
      <TableCell>Connections</TableCell>
      {gameConcluded && <TableCell>Pts.</TableCell>}
      <TableCell>
        Est. <RewardsIcon />
      </TableCell>
      {data?.map((item: LeaderboardItem, index: number) => (
        <React.Fragment key={index}>
          <TableCell rank>#{index + 1}</TableCell>
          <TableCell align="left">
            {item.username.length > 12
              ? `${item.username.slice(0, 12)}...`
              : item.username}
          </TableCell>
          <TableCell>{item.connections}</TableCell>
          {gameConcluded && <TableCell>{item.points}</TableCell>}
          <TableCell>{formatNumber(item.token)} PNK</TableCell>
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

export default Table;
