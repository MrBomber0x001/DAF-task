/* Replace with your SQL commands */
CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "total_price" numeric,
  "status" VARCHAR,
  "created_at" timestamp
);

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");