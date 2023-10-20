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

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#fff'
        }
      },
      y: {
        grid: {
          color: '#fff'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff'
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
        backgroundColor: 'rgba(255, 99, 132)',
      },
    ],
  };

  return <Bar options={options} height='500' data={data} />;
}