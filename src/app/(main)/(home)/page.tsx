"use client";
import React, { useState } from "react";
import Welcome from "./(Welcome)/Welcome";
import Home from "./(Home)/Home";

const Main: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <>
      {isAuthenticated ? (
        <Home />
      ) : (
        <Welcome setAuthenticated={setAuthenticated} />
      )}
    </>
  );
};

export default Main;
