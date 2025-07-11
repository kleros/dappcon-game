"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Filter } from "bad-words";
import Divider from "@/assets/divider.svg";
import LabeledInput from "@/components/LabeledInput";
import LightLinkButton from "@/components/LightLinkButton";
import useAuthentication from "@/hooks/useAuthentication";
import { toast } from "react-toastify";

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 12;
const TOKEN_NOT_FOUND = "not_found";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const FormError = styled.p`
  color: red;
  font-weight: 200;
`;

const Heading = styled.div`
  h2:first-child {
    font-weight: 200;
  }

  h2:last-child {
    font-weight: 400;
  }
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledDivider = styled(Divider)<{ top?: boolean; bottom?: boolean }>`
  margin: ${({ top }) => (top ? "0 0 20px" : "20px 0 0")};
  transform: ${({ bottom }) =>
    bottom ? "rotateY(180deg) rotateX(180deg)" : "none"};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const Auth: React.FC = () => {
  const { authenticate, isLoading } = useAuthentication();
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token") || TOKEN_NOT_FOUND);
  }, []);

  const handleStart = async () => {
    const filter = new Filter();
    if (
      username.length < MIN_USERNAME_LENGTH ||
      username.length > MAX_USERNAME_LENGTH
    ) {
      setUsernameError(
        `Username must be between ${MIN_USERNAME_LENGTH} - ${MAX_USERNAME_LENGTH} characters in length.`
      );
      return;
    } else if (filter.isProfane(username) || !/^[A-Za-z]+$/.test(username)) {
      setUsernameError("Username not allowed.");
      return;
    }
    setUsernameError(null);

    try {
      await authenticate(username, token);
      toast.success("Authenticated successfully , Redirecting...");
      window.location.reload();
    } catch (error: any) {
      toast.error(
        error.message
          ? error.message
          : "Failed to authenticate, QR code is not valid."
      );
    }
  };

  return (
    <Container>
      <Heading>
        <h2>Welcome to</h2>
        <h2>Kleros Schelling Game</h2>
      </Heading>
      <FormContainer>
        <StyledDivider top />
        {token === TOKEN_NOT_FOUND
          ? <StyledLinkButton text="Rules" url="/rules" />
          : (
            <>
              <StyledText>Type your username to start</StyledText>
              <LabeledInput
                name="Username"
                label="Username"
                placeholder="Bob"
                value={username}
                onChange={(e) => {
                  if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === "") {
                    setUsername(e.target.value);
                  }
                }}
              />
              {usernameError && <FormError>{usernameError}</FormError>}
              <StyledLinkButton
                text={isLoading ? "Authenticating..." : "Start"}
                disabled={isLoading}
                onClick={handleStart}
              />
            </>
          )
        }
        <StyledDivider bottom />
      </FormContainer>
    </Container>
  );
};

export default Auth;
