"use client";
import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import { TableContainer, TableCellWrapper, TableCell } from "./Table";

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
const MyRank = styled(TableCell)`
  color: ${darkTheme.klerosUIComponentsWhiteBackground};
  font-weight: 400;
  padding-right: 10px;
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
        <TableCellWrapper rank>
          <MyRank>{rank}</MyRank>
          <TableCell>{name}</TableCell>
        </TableCellWrapper>
        <TableCellWrapper>
          <TableCell>{connections}</TableCell>
          <TableCell>{points}</TableCell>
          <TableCell>{estimate}</TableCell>
        </TableCellWrapper>
      </TableContainer>
    </Container>
  );
};

export default UserPoints;
