export type Order = {
    id: number;
    product: string;
    quantity: number;
    priceForOne: number;
    timestamp: number;
  };
  

export const dataObject = {
    "success": true,
    "payload": [
        {
            "id": 1,
            "product": "Water bottle",
            "quantity": 5, 
            "priceForOne": 10,
            "timestamp": 1713974040
        },
        {
            "id": 2,
            "product": "Milk bottle",
            "quantity": 2, 
            "priceForOne": 105,
            "timestamp": 1713974040
        },
        {
            "id": 3,
            "product": "Phone Case",
            "quantity": 5, 
            "priceForOne": 101,
            "timestamp": 1713974040
        },
        {
            "id": 4,
            "product": "Cable",
            "quantity": 5, 
            "priceForOne": 2,
            "timestamp": 1713974040
        },
        {
            "id": 5,
            "product": "Glasses 1",
            "quantity": 5, 
            "priceForOne": 19,
            "timestamp": 1713974040
        },
        {
            "id": 6,
            "product": "Glasses 2",
            "quantity": 5, 
            "priceForOne": 27,
            "timestamp": 1713974040
        },
        {
            "id": 7,
            "product": "Headphones",
            "quantity": 5, 
            "priceForOne": 16,
            "timestamp": 1713974040
        },
        {
            "id": 8,
            "product": "Wallet",
            "quantity": 5, 
            "priceForOne": 40,
            "timestamp": 1713974040
        }
    ] as Order[]
}



