// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.section),
    datasets: [
      {
        data: data.map((item) => item.score),
        backgroundColor: [
          "#4e79a7", // About
          "#f28e2c", // Experience
          "#e15759", // Skills
          "#76b7b2", // Certifications
          "#59a14f", // Education
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom", // move legend below the chart
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "100%", height: "360px" }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default PieChart;
