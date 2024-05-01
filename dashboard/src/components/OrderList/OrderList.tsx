import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import cheerio from 'cheerio'

export default function OrderList() {
  const appState = useContext(AppContext);
  const userId = appState.user?.uid;

  interface Order {
    orderId: string;
    customer: string;
    date: string;
    total: string;
    actions: string;
  }
  
  const [rows, setRows] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3000/orders`);
  
      if (!response.ok) {
        console.log('Response text:', await response.text());
        throw new Error('Network response was not ok');
      }
  
      const responseText = await response.text();
      const $ = cheerio.load(responseText);
      const rows = $('tbody tr').map((_, tr) => {
        const cells = $(tr).find('td');
        return {
          orderId: $(cells[0]).text(),
          customer: $(cells[1]).text(),
          date: $(cells[2]).text(),
          total: $(cells[3]).text().replace('$', ''),
          actions: $(cells[4]).find('a').attr('href'),
        };
      }).get();
  
      setRows(rows);
    }
  
    fetchOrders().catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ 
      backgroundColor: '#161738', 
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
        backgroundColor: '#161738',
      },
    }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#E1A189', fontWeight: 'bold' }}>Order ID</TableCell>
            <TableCell sx={{ color: '#E1A189', fontWeight: 'bold' }}>Customer</TableCell>
            <TableCell sx={{ color: '#E1A189', fontWeight: 'bold' }}>Date</TableCell>
            <TableCell align="center" sx={{ color: '#E1A189', fontWeight: 'bold' }}>Total</TableCell>
            <TableCell align="right" sx={{ color: '#E1A189', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell component="th" scope="row" sx={{ color: '#E1A189'}}>
                {row.orderId}
              </TableCell>
              <TableCell sx={{ color: '#E1A189'}}>{row.customer}</TableCell>
              <TableCell sx={{ color: '#E1A189'}}>
              {new Date(row.date * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell align="center" sx={{ color: '#E1A189', border: '1px solid #E1A189'}}>${row.total}</TableCell>
              <TableCell align="right" sx={{ color: '#E1A189'}}>
                <a href={row.actions}>View Details</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

