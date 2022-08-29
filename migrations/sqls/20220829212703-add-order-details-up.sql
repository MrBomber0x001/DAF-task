/* Replace with your SQL commands */
CREATE TABLE "order_details" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int,
  "product_id" int,
  "quantity" int
);

ALTER TABLE "order_details" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");