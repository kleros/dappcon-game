alter table "public"."users" drop constraint "users_username_check";

alter table "public"."users" add constraint "username_length_check" CHECK (((length(username) >= 3) AND (length(username) <= 16))) not valid;

alter table "public"."users" validate constraint "username_length_check";

