"use client";
import React from "react";
import styled from "styled-components";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const Container = styled.main`
  height: 100vh;
`;

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
