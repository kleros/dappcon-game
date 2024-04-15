"use client";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import RewardsIcon from "@/assets/rewards.svg";
import { darkTheme } from "@kleros/ui-components-library";

export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 10px;
`;

export const TableCell = styled.div<{ rank?: boolean }>`
  padding-bottom: 8px;
  font-weight: ${({ rank }) => (rank ? "600" : "200")};
  color: ${({ rank }) => rank && darkTheme.klerosUIComponentsSecondaryPurple};
`;

export const TableCellWrapper = styled.div<{
  rank?: boolean;
  rankHeader?: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ rank }) => (rank ? "1fr 3fr" : "repeat(3, 1fr)")};

  text-align: ${({ rankHeader, rank }) =>
    rankHeader ? "left" : rank ? "left" : "right"};

  ${({ rankHeader }) => rankHeader && "grid-template-columns: 1fr"};
`;

interface LeaderboardItem {
  username: string;
  connections: number;
  points: number;
  token: number;
}

const Table: React.FC = () => {
  const { isPending, error, data } = useQuery<LeaderboardItem[]>({
    queryKey: ["leaderboardData"],
    queryFn: () => fetch("/api/leaderboard").then((res) => res.json()),
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>an error occured</div>;

  return (
    <TableContainer>
      <TableCellWrapper rankHeader>
        <TableCell>Top 10</TableCell>
      </TableCellWrapper>
      <TableCellWrapper>
        <TableCell>Connections</TableCell>
        <TableCell>Pts.</TableCell>
        <TableCell>
          Est. <RewardsIcon />
        </TableCell>
      </TableCellWrapper>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <TableCellWrapper rank>
            <TableCell rank>#{index + 1}</TableCell>
            <TableCell>{item.username.length > 8 ? `${item.username.slice(0, 8)}...` : item.username}</TableCell>
          </TableCellWrapper>
          <TableCellWrapper>
            <TableCell>{item.connections}</TableCell>
            <TableCell>{item.points}</TableCell>
            <TableCell>~{item.token} PNK</TableCell>
          </TableCellWrapper>
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

export default Table;
