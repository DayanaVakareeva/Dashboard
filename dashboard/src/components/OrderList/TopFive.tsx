import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import cheerio from 'cheerio';
import Tooltip from '@mui/material/Tooltip';

/**
 * TopOrders is a component that fetches and displays a list of top orders.
 * Each order includes an Order ID, Customer name, Date, Total amount, and Actions.
 * The Actions column includes a "View Details" tooltip that appears on hover.
 *
 * @component
 * @example
 * return (
 *   <TopOrders />
 * )
 */
export default function TopOrders() {
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

  /**
 * fetchOrders is a function that fetches the list of top orders from the server.
 * It uses the Cheerio library to parse the HTML response and extract the order data.
 * The order data is then set in the component's state.
 *
 * @async
 * @function
 * @throws Will throw an error if the network response is not ok.
 */
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3000/top-orders`);

      if (!response.ok) {
        console.log('Response text:', await response.text());
        throw new Error('Network response was not ok');
      }

      const responseText = await response.text();
      const $ = cheerio.load(responseText);
      const rows = $('tbody tr')
        .map((_, tr) => {
          const cells = $(tr).find('td');
          return {
            orderId: $(cells[0]).text(),
            customer: $(cells[1]).text(),
            date: $(cells[2]).text(),
            total: $(cells[3]).text().replace('$', ''),
            actions: $(cells[4]).find('a').attr('href'),
          };
        })
        .get();

      rows.sort((a, b) => Number(b.orderId) - Number(a.orderId));

      setRows(rows);
    }

    fetchOrders().catch((error) =>
      console.error('Error fetching orders:', error)
    );
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: '#161738',
        borderRadius: '10px',
      }}
    >
      <Table sx={{ minWidth: '500px' }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#E1A189' }}>
          <TableRow>
            <TableCell
              sx={{
                color: '#161738',
                fontWeight: 'bold',
                paddingRight: '4px',
                paddingLeft: '4px',
                width: '100px',
              }}
            >
              Order ID
            </TableCell>
            <TableCell
              sx={{
                color: '#161738',
                fontWeight: 'bold',
                paddingRight: '4px',
                paddingLeft: '4px',
              }}
            >
              Customer
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: '#161738',
                fontWeight: 'bold',
                paddingRight: '4px',
                paddingLeft: '4px',
              }}
            >
              Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: '#161738',
                fontWeight: 'bold',
                paddingRight: '4px',
                paddingLeft: '4px',
              }}
            >
              Total
            </TableCell>
            <TableCell
              align="right"
              sx={{
                color: '#161738',
                fontWeight: 'bold',
                paddingRight: '5px',
                paddingLeft: '4px',
                width: '100px',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: '#E1A189',
                  paddingRight: '4px',
                  paddingLeft: '4px',
                  width: '100px',
                }}
              >
                {row.orderId}
              </TableCell>
              <TableCell
                sx={{
                  color: '#E1A189',
                  paddingRight: '4px',
                  paddingLeft: '4px',
                }}
              >
                {row.customer}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: '#E1A189',
                  paddingRight: '5px',
                  paddingLeft: '4px',
                }}
              >
                {new Date(row.date * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: '#E1A189',
                  border: '1px solid #E1A189',
                  paddingRight: '4px',
                  paddingLeft: '4px',
                }}
              >
                ${row.total}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: '#E1A189',
                  paddingRight: '5px',
                  paddingLeft: '4px',
                  width: '100px',
                }}
              >
                <Tooltip title="Order Details" placement="left">
                  <span style={{ cursor: 'pointer' }}>View Details</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
