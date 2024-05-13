alter table "public"."answers" add constraint "choice_range_constraint" CHECK (((choice >= 0) AND (choice <= 3))) not valid;

alter table "public"."answers" validate constraint "choice_range_constraint";

alter table "public"."questions" add constraint "exact_answers_length" CHECK ((array_length(answers, 1) = 4)) not valid;

alter table "public"."questions" validate constraint "exact_answers_length";


