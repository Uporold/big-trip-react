import { PointInterface, UniqueDate } from "../types";
import { months } from "../const";

const FULL_PATH_CITIES_COUNT = 3;

export const getTrail = (points: Array<PointInterface>): string => {
  return points.length <= FULL_PATH_CITIES_COUNT
    ? points.map((point) => point.destination.name).join(` — `)
    : `${points[0].destination.name} — ... — ${
        points[points.length - 1].destination.name
      }`;
};

export const getNoRepeatingDates = (
  points: Array<PointInterface>,
): Array<UniqueDate> => {
  const set: Set<string> = new Set();
  points.forEach((point) =>
    set.add(
      JSON.stringify({
        year: point.startDate.getFullYear(),
        day: point.startDate.getDate(),
        month: months[point.startDate.getMonth()],
      }),
    ),
  );

  return Array.from(set).map((point) => JSON.parse(point));
};

export const getDaysInterval = (trailDates: UniqueDate[]): string => {
  return `${
    trailDates.length
      ? `${trailDates[0].month} ${trailDates[0].day} — ${
          trailDates[0].month !== trailDates[trailDates.length - 1].month
            ? trailDates[trailDates.length - 1].month
            : ``
        } ${trailDates[trailDates.length - 1].day}`
      : ``
  }`;
};
