import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatTimeDiff = (endDate: Date, startDate: Date): string => {
  const timeDiff = dayjs(endDate).diff(dayjs(startDate));
  const timeDiffFormatted =
    dayjs.duration(timeDiff).days() >= 1 ? `DD[D]HH[H]:mm[M]` : `HH[H]:mm[M]`;
  return dayjs.duration(timeDiff).format(timeDiffFormatted);
};

export const formatDate = (date: Date, isForm?: boolean): string => {
  return isForm
    ? dayjs(date).format(`DD/MM/YY HH:mm`)
    : dayjs(date).format(`HH:mm`);
};
