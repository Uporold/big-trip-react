import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { ChartType, typeItemsActivity } from "../../const";
import { usePoints } from "../../redux/data/hooks/selectors";
import { PointInterface } from "../../types";
import { ensure } from "../../utils/common";
import { BAR_HEIGHT, setOptions, setData } from "../../utils/chart";
import { getTimeDiffInMilliseconds } from "../../utils/time";

const Statistics: React.FC = (): JSX.Element => {
  const points = usePoints();

  const getData = (
    cb: ((point: PointInterface) => number) | (() => boolean),
  ) => {
    const reducer = (sum: Map<string, number>, point: PointInterface) => {
      const { type } = point;
      if (!sum.has(type)) {
        sum.set(type, 0);
      }

      sum.set(type, ensure(sum.get(type)) + (cb(point) as number));

      if (cb(point) === true) {
        typeItemsActivity.forEach((it) => {
          sum.delete(it);
        });
      }

      return sum;
    };
    return Array.from(points.reduce(reducer, new Map())).sort((a, b) => {
      return b[1] - a[1];
    });
  };

  const getMoneyTotal = () => {
    return getData((point: PointInterface) => {
      return point.basePrice;
    });
  };

  const getTransportTotal = () => {
    return getData(() => {
      return true;
    });
  };

  const getTimeTotal = () => {
    return getData((point: PointInterface) => {
      return getTimeDiffInMilliseconds(point.endDate, point.startDate);
    });
  };

  const getChartData = (cb: () => [string, number][]) => {
    const data = cb();
    return setData(data);
  };

  const getChartHeight = (cb: () => [string, number][]) => {
    return cb().length * BAR_HEIGHT;
  };

  return (
    <section className="statistics">
      <h2 className="visually-hidden">Trip statistics</h2>

      <div className="statistics__item statistics__item--money">
        <HorizontalBar
          width={900}
          height={getChartHeight(getMoneyTotal)}
          data={getChartData(getMoneyTotal)}
          options={setOptions(ChartType.MONEY)}
        />
      </div>

      <div className="statistics__item statistics__item--transport">
        <HorizontalBar
          width={900}
          height={getChartHeight(getTransportTotal)}
          data={getChartData(getTransportTotal)}
          options={setOptions(ChartType.TRANSPORT)}
        />
      </div>

      <div className="statistics__item statistics__item--time-spend">
        <HorizontalBar
          width={900}
          height={getChartHeight(getTimeTotal)}
          data={getChartData(getTimeTotal)}
          options={setOptions(ChartType.TIME_SPENT)}
        />
      </div>
    </section>
  );
};

export default Statistics;
