import { Order } from "./data";
import { dataObject } from "./data";

const products = {};

dataObject.payload.forEach((order: Order) => {
  products[order.product] = {
    id: order.id,
    price: order.priceForOne,
  };
});

export const PRODUCTS = products;