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

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gráfica de participación',
    },
  },
};

const labels = ['Comunicación Social', 'Administración', 'Contaduría', 
  'Ing.Civil', 'Ing. Industrial', 'Ing. Informática', 'Derecho'];

var registration = [7, 5 ,3 ,8, 9, 10, 9];
var participation = [6, 5 ,3 ,5, 7, 8, 8];

export const data = {
  labels,
  datasets: [
    {
      label: 'Inscripciones',
      data: registration,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Promedio Participaciones',
      data: participation,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}