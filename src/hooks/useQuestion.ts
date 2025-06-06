import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";
import { NO_RETRY_RESPONSES } from "@/app/api/question/route";

type Question = Database["public"]["Tables"]["questions"]["Row"] & {
  timestamp: number;
};

export const useQuestion = (id: string) => {
  const {
    isPending,
    error,
    data: question,
  } = useQuery<Question>({
    queryKey: ["question", id],
    retry: (count, error) => {
      if (NO_RETRY_RESPONSES.includes(error.message)) {
        return false;
      } else if (count > 2) {
        return false;
      }
      return true;
    },
    queryFn: async () => {
      const response = await fetch(`/api/question?id=${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return response.json();
    },
  });

  const submitAnswer = async (question_id: string, choice: string) => {
    const decodedId = decodeURIComponent(id);
    console.log({ id: decodedId, question_id, choice });
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: decodedId, question_id, choice }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  };
  return { isPending, error, question, submitAnswer };
};
