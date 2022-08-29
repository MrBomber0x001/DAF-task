- [ ] Sign up
- [ ] Sign in
- [ ] create order
- [ ] get user orders
- [ ] accept/reject order

## JWT authentication

## User table

Id (primary – auto increment)
First name
Middle name
Last name
Email
Password [hash]
Phone number
Created at
Token (for jwt auth)

## Product table

id
product_name
Price
quantity

## order

id
User_id (foreign key)
Total price
Status (accepted – rejected)
Created at

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
