"use client";
import React from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const Container = styled.main`
  height: 100vh;
`;

const queryClient = new QueryClient();

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header />
        {children}
        <Footer />
      </Container>
    </QueryClientProvider>
  );
};

export default Layout;
