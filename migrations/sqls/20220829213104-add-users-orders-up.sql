/* Replace with your SQL commands */
CREATE TABLE "users_orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "order_id" int
);


ALTER TABLE "users_orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "users_orders" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE;
