import { useState } from "react";
import { useLocalStorage } from "react-use";

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userid, setUserId] = useLocalStorage<string>("user_id");
  const [username, setUsername] = useLocalStorage<string>("username");
  const [connections, setConnections] = useLocalStorage<string>("connections");
  const [token, setToken] = useLocalStorage<string>("token");

  const authenticate = async (
    username: string,
    token: string
  ): Promise<any> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, token }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      } else {
        const data = await response.json();
        setUserId(data.user_id);
        setUsername(data.username);
        setConnections(data.connections);
        setToken(data.token);
        setIsLoading(false);
        return data;
      }
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    userid,
    username,
    connections,
    token,
    authenticate,
  };
};

export default useAuthentication;
