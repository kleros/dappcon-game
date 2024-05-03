create table "public"."answers" (
    "question_id" uuid not null,
    "player_id" uuid not null,
    "choice" smallint not null
);


create table "public"."questions" (
    "id" uuid not null default gen_random_uuid(),
    "player_id" uuid,
    "question" text not null,
    "answers" text[] not null
);


CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE UNIQUE INDEX questions_player_id_key ON public.questions USING btree (player_id);

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."answers" add constraint "public_answers_player_id_fkey" FOREIGN KEY (player_id) REFERENCES users(user_id) not valid;

alter table "public"."answers" validate constraint "public_answers_player_id_fkey";

alter table "public"."answers" add constraint "public_answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."answers" validate constraint "public_answers_question_id_fkey";

alter table "public"."questions" add constraint "public_questions_player_id_fkey" FOREIGN KEY (player_id) REFERENCES users(user_id) ON DELETE SET NULL not valid;

alter table "public"."questions" validate constraint "public_questions_player_id_fkey";

alter table "public"."questions" add constraint "questions_player_id_key" UNIQUE using index "questions_player_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.assign_question_to_player()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    question_id uuid;
BEGIN
    -- Find an unassigned question
    SELECT id INTO question_id
    FROM questions 
    WHERE player_id IS NULL
    ORDER BY id
    LIMIT 1;

    -- Assign the question to the new player
    IF question_id IS NOT NULL THEN
        UPDATE questions 
        SET player_id = NEW.user_id
        WHERE id = question_id;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE TRIGGER trigger_assign_question_to_player AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION assign_question_to_player();


