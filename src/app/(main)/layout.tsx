"use client";
import styled from "styled-components";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Container = styled.main`
    height: 100vh;
  `;

  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
