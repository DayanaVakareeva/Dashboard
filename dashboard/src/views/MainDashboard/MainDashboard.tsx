import { useContext, useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import AppContext from '../../context/AppContext';
import LineChart from '../../components/LineChart/LineChart';
import TopOrders from '../../components/OrderList/TopFive';
import { useWindowSize } from 'react-use';

/**
 * Dashboard component
 * @returns JSX.Element
 */
export default function Dashboard() {
  const appState = useContext(AppContext);
  const { width } = useWindowSize();

  return (
    <div className="grid grid-cols-2 gap-2 m-5">
      <div className="bg-inner-blue rounded-lg">
        {/* PieChart component with key prop */}
        <PieChart key={width} />
      </div>
      <div >
        <div className="bg-inner-blue mb-5 rounded-lg">
          {/* LineChart component with key prop */}
          <LineChart key={width} />
        </div>
        <div>
          {/* TopOrders component */}
          <TopOrders />
        </div>
      </div>
    </div>
  );
}
