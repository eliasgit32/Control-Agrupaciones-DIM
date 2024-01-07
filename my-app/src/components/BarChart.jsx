import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart(props) {
  // Asignar arreglos de datos
  const {labels, registration, participation} =  props;

  const legendColor = '#343434';

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: legendColor
        },
        grid: {
          color: legendColor
        }
      },
      y: {
        ticks: {
          color: legendColor
        },
        grid: {
          color: legendColor
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: legendColor
        }
      }
    }
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Inscritos',
        data: registration,
        backgroundColor: 'rgba(53, 162, 235)',
      },
      {
        label: 'Participantes',
        data: participation,
        backgroundColor: 'rgba(237, 45, 64)',
      },
    ],
  };

  return <Bar options={options} height='500' data={data} />;
}