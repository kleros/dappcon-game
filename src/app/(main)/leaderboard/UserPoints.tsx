"use client";
import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import { TableContainer, TableRow, TableCell } from "./Table";

interface UserDataProps {
  rank: string;
  name: string;
  connections: number;
  points: number;
  estimate: string;
}

const Container = styled.div`
  border: 2px solid ${darkTheme.klerosUIComponentsSecondaryBlue};
  border-radius: 8px;
  padding-top: 8px;
  background-color: ${darkTheme.klerosUIComponentsSecondaryPurple};
`;

const UserPoints: React.FC<UserDataProps> = ({
  rank,
  name,
  connections,
  points,
  estimate,
}) => {
  return (
    <Container>
      <TableContainer>
        <TableRow>
          <div className="top10">
            <TableCell className="my-rank">{rank}</TableCell>
            <TableCell>{name}</TableCell>
          </div>
        </TableRow>
        <TableRow>
          <div className="points">
            <TableCell>{connections}</TableCell>
            <TableCell>{points}</TableCell>
            <TableCell>{estimate}</TableCell>
          </div>
        </TableRow>
      </TableContainer>
    </Container>
  );
};

export default UserPoints;
