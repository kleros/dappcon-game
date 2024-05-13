import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";

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
