create table "public"."leaderboard" (
    "username" text not null,
    "connections" integer not null default 0,
    "points" integer not null default 0,
    "token" integer not null default 0
);


create table "public"."users" (
    "user_id" uuid not null,
    "username" text not null,
    "address" text
);


CREATE UNIQUE INDEX leaderboard_pkey ON public.leaderboard USING btree (username);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);

alter table "public"."leaderboard" add constraint "leaderboard_pkey" PRIMARY KEY using index "leaderboard_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."leaderboard" add constraint "public_leaderboard_username_fkey" FOREIGN KEY (username) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."leaderboard" validate constraint "public_leaderboard_username_fkey";

alter table "public"."users" add constraint "users_username_key" UNIQUE using index "users_username_key";

alter table "public"."users" add constraint "users_username_check" CHECK ((length(username) >= 3)) not valid;

alter table "public"."users" validate constraint "users_username_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_user_to_leaderboard()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.username IS NOT NULL THEN
        INSERT INTO leaderboard (username) VALUES (NEW.username);
    ELSE
        RAISE EXCEPTION 'Username cannot be null';
    END IF;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error occurred while adding user to leaderboard: %', SQLERRM;
        RETURN NULL;
END;
$function$
;

CREATE TRIGGER add_user_to_leaderboard_trigger AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION add_user_to_leaderboard();