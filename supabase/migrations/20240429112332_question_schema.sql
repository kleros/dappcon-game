CREATE UNIQUE INDEX pk_answer ON public.answers USING btree (question_id, player_id);

alter table "public"."answers" add constraint "pk_answer" PRIMARY KEY using index "pk_answer";


