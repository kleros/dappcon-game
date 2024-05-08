"use client";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import RewardsIcon from "@/assets/rewards.svg";
import { darkTheme } from "@kleros/ui-components-library";
import { Database } from "@/types/supabase";

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

type LeaderboardItem = Database["public"]["Tables"]["leaderboard"]["Row"];

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
      {data?.map(
        (item: LeaderboardItem, index: number, array: LeaderboardItem[]) => {
          // Calculate rank by counting previous items with greater connections
          const rank =
            array.filter((el) => el.connections > item.connections).length + 1;

          return (
            <React.Fragment key={index}>
              <TableCellWrapper rank>
                <TableCell rank>#{rank}</TableCell>
                <TableCell>
                  {item.username.length > 8
                    ? `${item.username.slice(0, 8)}...`
                    : item.username}
                </TableCell>
              </TableCellWrapper>
              <TableCellWrapper>
                <TableCell>{item.connections}</TableCell>
                <TableCell>{item.points}</TableCell>
                <TableCell>~{item.token} PNK</TableCell>
              </TableCellWrapper>
            </React.Fragment>
          );
        }
      )}
    </TableContainer>
  );
};

export default Table;
