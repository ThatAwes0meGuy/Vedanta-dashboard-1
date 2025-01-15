import React, {useEffect} from "react";
import { Link } from "react-router";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
} from "chart.js";
import { getHealthCumulative } from "../utils/pageFilter";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement
);

const Home = ({machineData}) => {
  const health = getHealthCumulative(machineData)
  console.log('health', health)
  // Dummy data for charts
  const pieData = {
    labels: ["NORMAL", "MARGINAL", "CRITICAL"],
    datasets: [
      {
        data: [health.NORMAL, health.MARGINAL, health.CRITICAL],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#EF5350"],
      },
    ],
  };

  const barData = {
    labels: ["ALH_MECH", "PDS_MECH", "NPA_MECH", "PPT_MECH"],
    datasets: [
      {
        label: "Performance %",
        data: [90, 80, 70, 85],
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Temperature °C",
        data: [22, 24, 19, 25, 28, 26],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white pb-6 sm:pb-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section className="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
            <img
              src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500"
              loading="lazy"
              alt="Photo by Fakurian Design"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply"></div>
            <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
              <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
                Very proud to introduce
              </p>
              <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
                Machine Health Dashboard
              </h1>
              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a
                  href="#insights"
                  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Start now
                </a>
                <Link
                  to="/visualize"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Check Health
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-gray-50 py-12" id="insights">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Dashboard Insights
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pie Chart */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-700">
                Health Status
              </h3>
              <Pie data={pieData} />
            </div>

            {/* Horizontal Bar Chart */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-700">
                Machine Performance
              </h3>
              <Bar
                data={barData}
                options={{
                  indexAxis: "y", // Horizontal bars
                  responsive: true,
                }}
              />
            </div>

            {/* Line Chart */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-700">
                Temperature Trends ALH_MECH
              </h3>
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  tension: 0.4, // Smooth line
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
