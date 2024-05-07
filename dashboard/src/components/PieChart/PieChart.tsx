import  { useEffect, useState, useRef } from 'react';
import { Chart, ArcElement, PieController } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { getElementAtEvent, getElementsAtEvent, getDatasetAtEvent } from 'chart.js';

/**
 * PieChart component
 * 
 * This component displays a pie chart of product quantities for a given user.
 * 
 * Props:
 * - userId: string - The ID of the user for whom to display the chart.
 * 
 * State:
 * - data: object - An object where the keys are product names and the values are quantities.
 * 
 * Effects:
 * - On mount, fetches the orders for the given user and calculates the quantity of each product.
 * 
 * Returns:
 * - A Pie chart component from react-chartjs-2, with the data formatted for the chart.
 */

Chart.register(ArcElement, PieController);
export default function PieChart() {
  const [data, setData] = useState<{ [product: string]: number }>({});
  const chartRef = useRef();
  const [clickedElement, setClickedElement] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/pie-chart');
        const transformedData = response.data.reduce((acc, item) => {
          acc[item.label] = item.value;
          return acc;
        }, {});
        setData(transformedData);
        
      } catch (error) {
        console.error('There was a problem with the fetch request', error);
      }
    }
  
    fetchData();
  }, []);

  const pieData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#B3F06C',
          '#F0E94F',
        ],
        hoverBackgroundColor: [
          '#F5998E',
          '#9AF58E',
          '#F5E48E',
        ],
        borderColor: [
          '#161738',
          '#161738',
          '#161738',
        ],
        borderWidth: 1, 
      }
    ]
  };
  
  return (
    <>
      <Pie
        ref={chartRef}
        data={pieData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
            tooltips: {
              callbacks: {
                title: function(context) {
                  return context[0].label;
                },
                label: function(context) {
                  return context.formattedValue;
                }
              }
            }
          }
        }}
        onClick={(event) => {
          const chart = chartRef.current;
          const elems = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        
          if (elems.length) {
            const { datasetIndex, index } = elems[0];
            const elementData = chart.data.datasets[datasetIndex].data[index];
            const elementLabel = chart.data.labels[index];
        
            if (clickedElement && clickedElement.data === elementData && clickedElement.label === elementLabel) {
              setClickedElement(null);
            } else {
              setClickedElement({ data: elementData, label: elementLabel });
              setPopupPosition({ x: event.clientX, y: event.clientY });
            }
          }
        }}
      />{clickedElement && (
        <div style={{
          position: 'fixed',
          left: `${popupPosition.x}px`,
          top: `${popupPosition.y}px`,
          backgroundColor: '#161738',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'
        }}>
          <p>{clickedElement.label}: {clickedElement.data}</p>
        </div>
      )}
    </>
  );
}