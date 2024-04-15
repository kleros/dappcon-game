import { getUserStats } from "@/lib/supabase/queries";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    if (!username) {
        return new Response("Username not provided", { status: 400 });
    }
    const { data, error } = await getUserStats(username);
    if (error) {
        return new Response(String(error), { status: 404 });
    }
    if (data) {
        return new Response(JSON.stringify(data[0]));
    }
    return new Response("Data not found", { status: 404 });
};
