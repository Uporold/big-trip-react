import { ChartData, ChartOptions } from "chart.js";
import { ChartType } from "../const";
import { formatTimeDiff } from "./time";

export const BAR_HEIGHT = 55;

const typeSymbols = new Map([
  [`taxi`, `🚕`],
  [`bus`, `🚌`],
  [`train`, `🚂`],
  [`ship`, `🛳`],
  [`transport`, `🚊`],
  [`drive`, `🚗`],
  [`flight`, `✈`],
  [`check-in`, `🏨`],
  [`sightseeing`, `🏛`],
  [`restaurant`, `🍴`],
]);

export const setData = (data: [string, number][]): ChartData => {
  return {
    labels: data.map((it) => {
      return `${it[0].toUpperCase()} ${typeSymbols.get(it[0])}`;
    }),
    datasets: [
      {
        data: data.map((it) => {
          return it[1];
        }),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        barThickness: 44,
        minBarLength: 50,
      },
    ],
  };
};

export const setOptions = (title: string): ChartOptions => {
  return {
    title: {
      display: true,
      text: title.toUpperCase(),
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label(tooltipItem) {
          switch (title) {
            case ChartType.MONEY:
              return `€ ${tooltipItem.xLabel}`;
            case ChartType.TRANSPORT:
              return `${tooltipItem.xLabel}х`;
            case ChartType.TIME_SPENT:
              return formatTimeDiff(tooltipItem.xLabel as number);
            default:
              return tooltipItem.value as string;
          }
        },
      },
    },
  };
};
