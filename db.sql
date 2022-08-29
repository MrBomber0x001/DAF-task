/* Replace with your SQL commands */
create table users(
    id serial PRIMARY key,
    email VARCHAR(100) UNIQUE not null,
    firstname VARCHAR(50) not null,
    middleName varchar(50),
    lastname VARCHAR(50) not null,
    phone INT,
    password text not null,
    created_at date,
    token varchar(120)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) not null,
    price NUMERIC(18, 2) not null,
    quantity VARCHAR(50) not null
);


CREATE TABLE orders (
    id serial PRIMARY key,
    total_price int,
    status varchar(20),
    created_at date
);


CREATE TABLE order_products (
    id serial PRIMARY key,
    order_id int references orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id int references products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity int
)




## Order details table

id
order id (foreign key)
Quantity
Created at

## User orders table

id
Order_id (foreign key)
User_id (foreign key)
Created at

