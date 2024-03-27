"use client";
import React, { useState } from "react";
import Question from "./Question";
import Solved from "./Solved";

const SchellingQuestion: React.FC = () => {
  const [isAlreadyConnected, setConnected] = useState<boolean>(false);

  return (
    <>
      {isAlreadyConnected ? (
        <Solved />
      ) : (
        <Question setConnected={setConnected} />
      )}
    </>
  );
};

export default SchellingQuestion;
