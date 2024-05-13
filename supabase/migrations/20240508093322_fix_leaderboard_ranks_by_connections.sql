alter table "public"."leaderboard" add column "last_connected" timestamp without time zone not null default now();

CREATE OR REPLACE FUNCTION public.get_user_stats(user_id_params uuid)
 RETURNS TABLE(username text, connections integer, points integer, token integer, rank integer)
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN QUERY 
  SELECT 
    lt.username, 
    lt.connections, 
    lt.points, 
    lt.token,
    (SELECT CAST(COUNT(*) + 1 AS INTEGER)
     FROM leaderboard AS lt2
     WHERE lt2.connections > lt.connections
        OR (lt2.connections = lt.connections AND lt2.last_connected < lt.last_connected)) AS rank
  FROM leaderboard AS lt
  INNER JOIN users AS u ON u.user_id = user_id_params
  WHERE lt.username = u.username;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_connection_count(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
    UPDATE leaderboard
    SET connections = connections + 1,
    last_connected = NOW()
    WHERE username = (SELECT username FROM users WHERE user_id = p_user_id);
END;$function$
;


