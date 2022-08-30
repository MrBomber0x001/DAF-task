-- CREATE SCHEMA "DAF";

-- CREATE TYPE "order_status" AS ENUM (
--   'accepted',
--   'rejected'
-- );

CREATE TABLE "DAF"."User" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar,
  "middlename" varchar,
  "lastname" varchar,
  "phone" int,
  "email" varchar,
  "password" varchar,
  "token" varchar
);

CREATE TABLE "DAF"."Product" (
  "id" SERIAL PRIMARY KEY,
  "product_name" varchar,
  "price" numeric,
  "quantity" int
);

CREATE TABLE "DAF"."Order" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "total_price" numeric,
  "status" order_status,
  "created_at" timestamp
);

CREATE TABLE "DAF"."Order_details" (
  "order_id" int,
  "product_id" int,
  "quantity" int
);

CREATE TABLE "DAF"."Users_Orders" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "orderId" int
);

ALTER TABLE "DAF"."Order" ADD FOREIGN KEY ("userId") REFERENCES "DAF"."User" ("id");

ALTER TABLE "DAF"."Order_details" ADD FOREIGN KEY ("order_id") REFERENCES "DAF"."Order" ("id");

ALTER TABLE "DAF"."Order_details" ADD FOREIGN KEY ("product_id") REFERENCES "DAF"."Product" ("id");

ALTER TABLE "DAF"."Users_Orders" ADD FOREIGN KEY ("userId") REFERENCES "DAF"."User" ("id");

ALTER TABLE "DAF"."Users_Orders" ADD FOREIGN KEY ("orderId") REFERENCES "DAF"."Order" ("id");
