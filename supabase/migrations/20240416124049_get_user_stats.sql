drop function if exists "public"."get_user_stats"(username_param text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_stats(user_id_params uuid)
 RETURNS TABLE(username text, connections integer, points integer, token integer, rank integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT 
    lt.username, 
    lt.connections, 
    lt.points, 
    lt.token,
    (SELECT CAST(COUNT(*) + 1 AS INTEGER)
     FROM leaderboard AS lt2
     WHERE lt2.points > lt.points) AS rank
  FROM leaderboard AS lt
  INNER JOIN users AS u ON u.user_id = user_id_params
  WHERE lt.username = u.username;
END;
$function$
;


