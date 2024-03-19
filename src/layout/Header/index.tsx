"use client"
import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import MobileHeader from "./Navbar/MobileHeader";

const Container = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  background-color: ${darkTheme.klerosUIComponentsPrimaryPurple};
  display: flex;
  flex-wrap: wrap;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 8px 24px 8px;
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <MobileHeader />    
      </HeaderContainer>
    </Container>
  );
};

export default Header;