"use client";
import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { darkTheme } from "@kleros/ui-components-library";
import { Database } from "@/types/supabase";
import { isGameConcluded } from "@/lib/game.config";
import { formatNumber } from "@/lib/utils";
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

type UserItem = Database["public"]["Functions"]["get_user_stats"]["Returns"][0];

const UserPoints: React.FC = () => {
  const gameConcluded = useMemo(() => isGameConcluded(), []);
  const { isPending, error, data } = useQuery<UserItem>({
    queryKey: ["userstats"],
    queryFn: () => fetch("/api/userstats").then((res) => res.json()),
  });

  if (isPending) return <div>please wait...</div>;

  if (error) return <div>something went wrong...</div>;

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
        <TableCellWrapper isGameConcluded={gameConcluded}>
          <TableCell>{data.connections}</TableCell>
          {gameConcluded && <TableCell>{data.points}</TableCell>}
          <TableCell>~{formatNumber(data.token)} PNK</TableCell>
        </TableCellWrapper>
      </TableContainer>
    </Container>
  );
};

export default UserPoints;
