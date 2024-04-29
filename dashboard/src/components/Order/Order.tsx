import React, { useState, useEffect } from "react";
import { addOrder } from '../../services/order.service'
import { PRODUCTS } from "../../constants/products";

const Order = ({userId}) => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
  
    useEffect(() => {
      if (product && quantity) {
        setPrice(PRODUCTS[product].price * quantity);
      }
    }, [product, quantity]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await addOrder(userId, product, quantity, price);
        setProduct('');
        setQuantity(1);
        setPrice(0);
      } catch (error) {
        console.error('Failed to add order:', error);
      }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <select value={product} onChange={e => setProduct(e.target.value)} required className="block w-full p-2 border border-gray-300 rounded">
            <option value="">Select a product</option>
            {Object.keys(PRODUCTS).map((productName) => (
              <option key={PRODUCTS[productName].id} value={productName}>{productName}</option>
            ))}
          </select>
          <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Quantity" required className="block w-full p-2 border border-gray-300 rounded" />
          <input type="number" value={price} readOnly className="block w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="block w-full p-2 bg-blue-500 text-white rounded">Add Order</button>
        </form>
      );
}

export default Order;