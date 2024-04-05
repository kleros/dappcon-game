"use client";
import React from "react";
import styled from "styled-components";
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
  rank: string;
  name: string;
  connections: number;
  points: number;
  estimate: string;
}

interface TableProps {
  LeaderboardData: LeaderboardItem[];
}

const Table: React.FC<TableProps> = ({ LeaderboardData }) => {
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
      {LeaderboardData.map((item) => (
        <React.Fragment key={item.rank}>
          <TableCellWrapper rank>
            <TableCell rank>{item.rank}</TableCell>
            <TableCell>{item.name}</TableCell>
          </TableCellWrapper>
          <TableCellWrapper>
            <TableCell>{item.connections}</TableCell>
            <TableCell>{item.points}</TableCell>
            <TableCell>{item.estimate}</TableCell>
          </TableCellWrapper>
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

export default Table;
