## project structure

```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜auth.controller.js
 ┃ ┣ 📜order.controller.js
 ┃ ┗ 📜product.controller.js
 ┣ 📂database
 ┃ ┗ 📜database.init.js
 ┣ 📂middlewares
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜jwt.js
 ┣ 📂models
 ┃ ┣ 📜Order.model.js
 ┃ ┣ 📜Product.model.js
 ┃ ┗ 📜User.model.js
 ┣ 📂routes
 ┃ ┣ 📜auth.routes.js
 ┃ ┣ 📜order.routes.js
 ┃ ┣ 📜product.routes.js
 ┃ ┗ 📜user.routes.js
 ┣ 📂utils
 ┣ 📜app.js
 ┗ 📜index.js
```

## DB Diagram

![](./screenshots/db_diagram.png)

## DB_SQL

[DB_SQL](./screenshots/db.sql)

## API endpoints

### Auth

| method | endpoint | action | params |
| --- | ---- | --- | -- |
| POST | /auth/signup | signup user | - |
| POST | /auth/login | login user | - |

### Order

| method | endpoint | action | params | query params |
| --- | ---- | --- | -- | -- |
| POST | /orders/create | create new order | - | - |
| POST | /orders/:orderId/products/:productId | add product to an order | orderId, productId | - |
| GET | /orders/users/:userId/ | get user's orders | userId | - |
| PUT | /orders/:orderId/ |  change order status | orderId | status |

### Product

| method | endpoint | action | params | query params |
| --- | ---- | --- | -- | -- |
| POST | /products/create | create new product | - | - |

## Installing

Install the project dependencies

```bash
npm install
```

## Setup and Connect to database

1. **creating user**

```sh
CREATE USER daf_user WITH PASSWORD 'password123';
```

2. **create both development and testing db**

```sh
CREATE DATABASE DAF;
CREATE DATABASE DAF_test;
```

3. **grant all privileges on both databases**

```sh
\c DAF;
GRANT ALL PRIVILEGES ON DATABASE DAF To daf_user;
\c DAF_test 
GRANT ALL PRIVILEGES ON DATABASE DAF_test To daf_user;
```

- setting enviroment variables

```sh
touch .env
nano .env

## place the enviroment variables below inside the .env file
# .env
APP_PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=shop_user
POSTGRES_DB=shop
POSTGRES_PASSWORD=password123
POSTGRES_TEST_DB=shop_test
ENV=test
BCRYPT_PASS=thisissupersecretpassword
SALT_ROUNDS=10
PEPPER=password
JWT_SECRET_KEY=thisissupersecretpassword
```

- port of the posgres database server
`5432`
- port of the backend:
the server runs <a href="http://localhost:3000">localhost</a>
- package installation instructions

## Running application

- to run on compiled files

```sh
npm run dev
```

- to run on typescript files

```sh
npm run start:dev
```

## Running Tests

To run tests, you need only two steps

1. Export ENV to test

```sh
export ENV=test
```

2. Run testing command, which will build the project and run the tests, this step is so important because `jasmine` tests the compiled js code

```sh
npm run build-test
```

or simple run

```sh
npm run test
```

## Logs

- [x] :rocket: Signup
- [ ] :rocket: Login
- [x] :rocket: accept/reject order
- [x] :rocket: create order
- [x] :rocket: get user order
- [x] :rocket: add product to order
- [ ] :rocket: setup testing
