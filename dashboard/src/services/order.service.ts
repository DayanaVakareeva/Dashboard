import { push, ref, onValue, query, equalTo, orderByChild, get } from "firebase/database"
import { db } from "../config/firebase-config.ts"


export const addOrder = async (userId: string, product: string, quantity: number, price: number) => {
    return push(ref(db, 'orders'), {
      userId,
      product,
      quantity,
      price,
      timestamp: Date.now()
    });
  };

  export const getOrdersByUser = async (userId: string) => {
    try {
      const ordersRef = ref(db, 'orders');
      const userOrdersQuery = query(ordersRef, orderByChild('userId'), equalTo(userId));
  
      const snapshot = await get(userOrdersQuery);
      if (snapshot.exists()) {
        let userOrders = [];
        snapshot.forEach((childSnapshot) => {
          const order = childSnapshot.val();
          order.id = childSnapshot.key; // Add the order ID to the order object
          userOrders.push(order);
        });
        return userOrders;
      } else {
        console.log('No orders found for user:', userId);
        return [];
      }
    } catch (error) {
      console.error('Error getting orders by user:', error);
      throw error;
    }
  };