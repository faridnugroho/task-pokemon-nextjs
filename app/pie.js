import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart() {
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 246, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 246, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/berry/2');
      const data = await response.json();
      setPieData({
        labels: [
          'Max Harvest',
          'Natural Gift Power',
          'Size',
          'Smoothness',
          'Soil Dryness',
          'Growth Time',
        ],
        datasets: [
          {
            label: '',
            data: [
              data.max_harvest,
              data.natural_gift_power,
              data.size,
              data.smoothness,
              data.soil_dryness,
              data.growth_time,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 246, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 246, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
      console.log('ini data apa', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Card sx={{ maxWidth: 450 }}>
        <CardContent>
          <Pie data={pieData} />
        </CardContent>
      </Card>
    </Box>
  );
}
