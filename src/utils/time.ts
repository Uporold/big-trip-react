import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const getTimeDiffInMilliseconds = (
  endDate: Date,
  startDate: Date,
): number => {
  const timeDiff = dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));
  return timeDiff.asMilliseconds();
};

export const formatTimeDiff = (timeDiff: number) => {
  const dur = dayjs.duration(timeDiff);
  const days = dur.days();
  const hours = dur.hours();
  const minutes = dur.minutes();

  return `${days > 0 ? `${days}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${
    minutes > 0 ? `${minutes}M` : ``
  }`;
};

export const formatDate = (date: Date, isForm?: boolean): string => {
  return isForm
    ? dayjs(date).format(`DD/MM/YY HH:mm`)
    : dayjs(date).format(`HH:mm`);
};
