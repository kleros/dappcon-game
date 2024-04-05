"use client";
import React, { useState } from "react";
import ClaimReward from "./ClaimReward";
import RewardClaimed from "./RewardClaimed";

const Claim: React.FC = () => {
  const [isClaimed, setClaimed] = useState<boolean>(false);
  return (
    <>
      {isClaimed ? <RewardClaimed /> : <ClaimReward setClaimed={setClaimed} />}
    </>
  );
};

export default Claim;
