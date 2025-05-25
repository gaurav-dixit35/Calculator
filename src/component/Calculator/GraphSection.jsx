import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const GraphSection = ({ graphData, chartRef, downloadGraphImage }) => {
  const data = graphData || []; // ✅ Add default fallback

  return (
    <div className="bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">Graph</h3>
      
      <Line ref={chartRef} data={graphData} />
      <div className="flex justify-between mt-4">
        <button
          onClick={downloadGraphImage}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Image
        </button>
        
      </div>
    </div>
  );
};

export default GraphSection;
