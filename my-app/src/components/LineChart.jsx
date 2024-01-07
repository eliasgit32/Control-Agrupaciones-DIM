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

export default function LineChart(props) {
  // Asignar arreglos de datos
  const { labels, registration, participation } = props;

  const legendColor = '#343434';

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: legendColor
        },
        grid: {
          color: '#fff'
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
      },
    },
  };

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

  //No retorna gráfico en caso de solo haber seleccionado un período
  if(labels.length < 2) return <></>;

  return <Line options={options} height='500' data={data} />;
}
