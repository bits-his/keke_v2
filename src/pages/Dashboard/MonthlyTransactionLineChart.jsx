import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { toParagraph } from "../../lib/Helper";

const MonthlyTransactionLineChart = ({ data = [], type = "Daily" }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartContainer && chartContainer.current) {
      const labels = data.map((item) => item.month);
      const transactionCounts = data.map((item) => item.transaction_count);

      const ctx = chartContainer.current.getContext("2d");

      // Destroy previous chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${toParagraph(type)} Transaction count`,
              data: transactionCounts,
              backgroundColor: "#f5c005",
              borderColor: "#f5c005",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Transaction Count",
              },
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      });
    }

    return () => {
      // Clean up chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default MonthlyTransactionLineChart;
