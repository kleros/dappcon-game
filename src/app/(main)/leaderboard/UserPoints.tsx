"use client";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { darkTheme } from "@kleros/ui-components-library";
import { TableContainer, TableCellWrapper, TableCell } from "./Table";

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

interface UserItem {
  username: string;
  connections: number;
  points: number;
  token: number;
  rank: number;
}

const UserPoints: React.FC = () => {
  const { isPending, error, data } = useQuery<UserItem>({
    queryKey: ["userstats"],
    queryFn: () => fetch("/api/userstats").then((res) => res.json()),
  });

  if (isPending) return <div>please wait...</div>;

  if (error) return <div>{error.message} an error occured</div>;

  return (
    <Container>
      <TableContainer>
        <TableCellWrapper rank>
          <MyRank>#{data.rank}</MyRank>
          <TableCell>
            {data.username.length > 8
              ? `${data.username.slice(0, 8)}...`
              : data.username}
          </TableCell>
        </TableCellWrapper>
        <TableCellWrapper>
          <TableCell>{data.connections}</TableCell>
          <TableCell>{data.points}</TableCell>
          <TableCell>~{data.token}PNK</TableCell>
        </TableCellWrapper>
      </TableContainer>
    </Container>
  );
};

export default UserPoints;
