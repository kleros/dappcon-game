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
export const TableHeader = styled.div`
  gap: 10px;
  .top10 {
    text-align: left;
  }
  .points {
    display: grid;
    text-align: right;
    grid-template-columns: repeat(3, 1fr);
  }
  .margin {
    margin-bottom: 16px;
  }
`;
export const TableRow = styled.div`
  .top10 {
    display: grid;
    text-align: left;
    grid-template-columns: 1fr 3fr;
  }
  .points {
    display: grid;
    text-align: right;
    grid-template-columns: repeat(3, 1fr);
  }
  .ranks {
    color: ${darkTheme.klerosUIComponentsSecondaryPurple};
    font-weight: 400;
  }
  .my-rank {
    color: ${darkTheme.klerosUIComponentsWhiteBackground};
    font-weight: 400;
    padding-right: 10px;
  }
`;
export const TableCell = styled.div`
  padding-bottom: 8px;
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
      <TableHeader>
        <div className="top10 margin">
          <TableCell>Top 10</TableCell>
        </div>
      </TableHeader>
      <TableHeader>
        <div className="points margin">
          <TableCell>Connections</TableCell>
          <TableCell>Pts.</TableCell>
          <TableCell>
            Est. <RewardsIcon/>
          </TableCell>
        </div>
      </TableHeader>
      {LeaderboardData.map((item) => (
        <>
          <TableRow key={item.rank}>
            <div className="top10">
              <TableCell className="ranks">{item.rank}</TableCell>
              <TableCell>{item.name}</TableCell>
            </div>
          </TableRow>
          <TableRow key={item.rank}>
            <div className="points">
              <TableCell>{item.connections}</TableCell>
              <TableCell>{item.points}</TableCell>
              <TableCell>{item.estimate}</TableCell>
            </div>
          </TableRow>
        </>
      ))}
    </TableContainer>
  );
};
export default Table;
