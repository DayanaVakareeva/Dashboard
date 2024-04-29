import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useContext } from 'react';
import { getOrdersByUser } from '../../services/order.service';
import { AppContext } from '../../context/AppContext';

export default function OrderList() {
  // const [rows, setRows] = useState([]);
  const appState = useContext(AppContext);
  const userId = appState.user?.uid;

  interface Order {
    userId: string;
    product: string;
    quantity: number;
    price: number;
    timestamp: number;
  }
  
  const [rows, setRows] = useState<Order[]>([]);

  

  useEffect(() => {
    async function fetchOrders() {
      if (userId) {
        const orders = await getOrdersByUser(userId);
        console.log(orders); // Log the orders
  
        // Sort orders by timestamp in descending order
        const sortedOrders = orders.sort((a, b) => b.timestamp - a.timestamp);
  
        setRows(sortedOrders);
      }
    }
  
    fetchOrders();
  }, [userId]);


  return (
<TableContainer component={Paper} sx={{ 
  backgroundColor: '#03061E', 
  borderRadius: '10px', 
  height: '700px', 
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.5em',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#03061E',
  },
}}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell sx={{ color: '#E1A189', fontWeight: 'bold' }}>Date</TableCell>
        <TableCell sx={{ color: '#E1A189', fontWeight: 'bold' }}>Product</TableCell>
        <TableCell align="right" sx={{ color: '#E1A189', fontWeight: 'bold' }}>Quantity</TableCell>
        <TableCell align="right" sx={{ color: '#E1A189', fontWeight: 'bold' }}>Price</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.product}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" sx={{ color: '#E1A189'}}>
            {new Date(row.timestamp).toLocaleDateString()}{' '}
            {/* Convert timestamp to date */}
          </TableCell>
          <TableCell sx={{ color: '#E1A189'}}>{row.product}</TableCell>
          <TableCell align="right" sx={{ color: '#E1A189'}}>{row.quantity}</TableCell>
          <TableCell align="right" sx={{ color: '#E1A189'}}>{row.price}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  );
}


