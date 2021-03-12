import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatTimeDiff = (endDate: Date, startDate: Date): string => {
  const timeDiff = dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));
  const days = timeDiff.days();
  const hours = timeDiff.hours();
  const minutes = timeDiff.minutes();

  return `${days > 0 ? `${days}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${
    minutes > 0 ? `${minutes}M` : ``
  }`;
};

export const formatDate = (date: Date, isForm?: boolean): string => {
  return isForm
    ? dayjs(date).format(`DD/MM/YY HH:mm`)
    : dayjs(date).format(`HH:mm`);
};
