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
import { BuildInfo } from 'frontend/src/types';
import theme from '../../theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FormatData = (
  buildSizeArray: number[],
  createdAtArray: string[],
  buildTimeArray: number[]
) => {
  const labels: string[] = []; // x-axis
  const timeStamp: string[] = []; //  tooltips
  const dataPoints: number[] = []; // y-axis for chart 1
  const buildTimeDataPoints: number[] = []; // y-axis for chart 2
  createdAtArray.forEach((date, index) => {
    const buildTimeStamp = new Date(date).toLocaleString();
    labels.push(`Build ${index}`);
    timeStamp.push(buildTimeStamp);
  });
  buildSizeArray.forEach((build) => dataPoints.push(build));
  buildTimeArray.forEach((build) => buildTimeDataPoints.push(build));
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataPoints,
        borderColor: theme.palette.primary.main,
        pointBorderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
  const buildTimeChartData = {
    labels,
    datasets: [
      {
        label: 'Dataset 2',
        data: buildTimeDataPoints,
        borderColor: theme.palette.primary.main,
        pointBorderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: theme.palette.primary.light,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Build Size (kB)',
        },
        grid: {
          color: theme.palette.primary.light,
        },
      },
    },
    plugins: {
      tooltip: {
        //  TODO on hover over data point, show date (needs TS support)
        callbacks: {
          label(context: { dataIndex: number }): string {
            const labelDataIndex = context.dataIndex;
            const createdAt = timeStamp[labelDataIndex];
            return `Created at ${createdAt}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  const buildTimeChartOptions = {
    scales: {
      x: {
        grid: {
          color: theme.palette.primary.light,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Build Time (ms)',
        },
        grid: {
          color: theme.palette.primary.light,
        },
      },
    },
    plugins: {
      tooltip: {
        //  TODO on hover over data point, show date (needs TS support)
        callbacks: {
          label(context: { dataIndex: number }): string {
            const labelDataIndex = context.dataIndex;
            const createdAt = timeStamp[labelDataIndex];
            return `Created at ${createdAt}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return { chartData, chartOptions, buildTimeChartData, buildTimeChartOptions };
};

interface LineChartProps {
  buildsInfo: BuildInfo[];
}
function LineChart({ buildsInfo }: LineChartProps): JSX.Element {
  const buildSizeArray = buildsInfo.map((build: BuildInfo) => build.buildSize);
  const createdAtArray = buildsInfo.map((build: BuildInfo) => build.createdAt);
  const buildTimeArray = buildsInfo.map((build: BuildInfo) => build.buildTime);
  const { chartData, chartOptions, buildTimeChartData, buildTimeChartOptions } =
    FormatData(buildSizeArray, createdAtArray, buildTimeArray);
  return (
    <div>
      <Line className="line-chart" data={chartData} options={chartOptions} />
      <Line
        className="line-chart"
        data={buildTimeChartData}
        options={buildTimeChartOptions}
      />
    </div>
  );
}

export default LineChart;
