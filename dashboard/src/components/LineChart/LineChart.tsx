import { Chart, LineController, CategoryScale, LineElement, PointElement, LinearScale } from 'chart.js';
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';

/**
 * LineChart component
 *
 * This is a React functional component that fetches data from a server and displays it in a line chart.
 *
 * State:
 * - data: { label: string, data: number }[] | null - The data to be displayed in the chart.
 *
 * Refs:
 * - chartRef: RefObject<HTMLCanvasElement> - A reference to the canvas element that the chart is drawn on.
 * - myChartRef: RefObject<Chart> - A reference to the Chart.js chart instance.
 *
 * Effects:
 * - On mount, it fetches data from 'http://localhost:3000/line-chart' and sets the `data` state variable.
 * - When the `data` state variable changes, it creates a new Chart.js chart instance and draws the chart on the canvas.
 *
 * Returns:
 * - A canvas element that the chart is drawn on.
 */

Chart.register(LineController, CategoryScale, LineElement, PointElement, LinearScale);

export default function LineChart (){

    
    const [data, setData] = useState(null)
    const chartRef = useRef(null);
    const myChartRef = useRef(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/line-chart');
                setData(response.data);                
            } catch (error) {
                console.error('There was a problem with the fetch request', error);
            }
        }
        
        fetchData();
      }, []);
    
      useEffect(() => {
        if (data && chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          const labels = data.map(item => item.label);
          const chartData = data.map(item => item.data);
      
          if (myChartRef.current) {
            
            myChartRef.current.data.labels = labels;
            myChartRef.current.data.datasets[0].data = chartData;
            myChartRef.current.update();
          } else {
          
            myChartRef.current = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: 'My Dataset',
                  data: chartData,
                  fill: false,
                  borderColor: '#FF6384',
                  borderWidth: 5,
                  tension: 0.1
                }]
              },
            options: {
              plugins: {
                legend: {
                  display: true, 
                }
              },scales: {
                x: {
                  grid: {
                    color:'rgba(234, 255, 227, 0.5)',
                    
                  },
                  ticks: {
                    color: '#F0E24F',
                  }
                },
                y: {
                  grid: {
                    color: 'rgba(234, 255, 227, 0.5)',
                  },
                  ticks: {
                    color: '#F0E24F',
                  }
                }
              }
            }, 
          });
        }
        }
      }, [data]);

    return <canvas ref={chartRef} />
}