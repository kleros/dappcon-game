"use client";
import React from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const Main = styled.main`
  overflow-y: scroll;
  height: 100vh;
  height: 100dvh;
}
`;

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  * {
    flex-shrink: 0;
  }
`;

const queryClient = new QueryClient();

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </Main>
    </QueryClientProvider>
  );
};

export default Layout;
