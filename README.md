# Shopping card project

Musts:

1 - Should not allow orders when invalid CPF;
2 - Should make an order with 3 products;
3 - Should make an order with 3 products using discount coupon;
4 - Should not make an order if product is not instock;

# How get it to work:

Up server:
- `npx nodemon src/main.ts`
- 

# Problems faced during development:

Cannot find module 'express':
    - `npm i --save-dev @types/express` resolve it!
Failed to start process, "ts-node" exec not found:
    - `npm install -g ts-node`