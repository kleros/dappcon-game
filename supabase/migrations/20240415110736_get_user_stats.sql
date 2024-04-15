set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_stats(username_param text)
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
  WHERE lt.username = username_param;
END;
$function$
;


