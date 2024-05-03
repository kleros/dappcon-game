set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_connection_count(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE leaderboard
    SET connections = connections + 1
    WHERE username = (SELECT username FROM users WHERE user_id = p_user_id);
END;
$function$
;


