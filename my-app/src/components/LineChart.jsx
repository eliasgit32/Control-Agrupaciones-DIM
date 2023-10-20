import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: '#fff'
      },
      grid: {
        color: '#fff'
      }
    },
    y: {
      ticks: {
        color: '#fff'
      },
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
    },
  },
};

export default function LineChart() {
  const labels = ['2024-15', '2024-25', '2025-15', '2025-25', '2026-15', '2026-25'];
  const registration = [1, 5, 9, 7, 6, 1];
  const participation = [1, 3, 8, 7, 4, 0];

const data = {
  labels,
  datasets: [
    {
      label: 'Inscritos',
      data: registration,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235)',
    },
    {
      label: 'Participantes',
      data: participation,
      borderColor: 'rgb(217, 17, 37)',
      backgroundColor: 'rgba(217, 17, 37)',
    },
  ],
};

  return <Line options={options} height='500' data={data} />;
}
