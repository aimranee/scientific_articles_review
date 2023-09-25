// DonutChart.js
import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js";

// Register Chart.js controllers and elements
Chart.register(DoughnutController, ArcElement);

interface DonutChartProps {
  width: number;
  height: number;
  data: {
    label: string;
    value: number;
    isEmpty?: boolean;
  }[];
  // calculatedValue: number; // Add the calculated value prop
}

const DonutChart: React.FC<DonutChartProps> = ({
  width,
  height,
  data,
  //  calculatedValue,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(
    null
  );

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        // Destroy the previous chart instance if it exists
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.map((item) => item.label),
            datasets: [
              {
                data: data.map((item) => item.value),

                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  // Add more colors as needed
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }
  }, [data]);
  console.log("value" + data);
  return (
    <div>
      <canvas ref={chartRef} width={width} height={height} />
      {/* // <p>Calculated Value: {calculatedValue}</p> */}
    </div>
  );
};

export default DonutChart;
