set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_total_connection_count()
 RETURNS TABLE(total_count integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    SELECT SUM(connections) INTO total_count FROM leaderboard;
    RETURN NEXT;
END;
$function$
;
