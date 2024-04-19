import { useState } from "react";

const useClaimReward = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const claimReward = async (address: string): Promise<any> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/claim-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.text();
      setIsLoading(false);
      return data;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  return { isLoading, claimReward };
};

export default useClaimReward;
