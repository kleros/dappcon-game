import { useEffect, useState } from "react";

const useTimer = (expirytime: number) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const timeformat = (seconds: number): string => {
    if (seconds < 60) {
      return seconds + " seconds";
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return (
        minutes +
        " minutes : " +
        (remainingSeconds < 10 ? "0" : "") +
        remainingSeconds +
        " seconds"
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = Math.floor((expirytime - Date.now()) / 1000);
      setTimeLeft(difference < 0 ? 0 : difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [expirytime]);

  const formattedTimeLeft = timeLeft !== null ? timeformat(timeLeft) : "";

  return { timeLeft, formattedTimeLeft };
};

export default useTimer;
