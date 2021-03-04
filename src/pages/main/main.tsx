import React, { useState } from "react";
import Header from "../../components/header/header";
import Sorting from "../../components/sorting/sorting";
import { SortingType } from "../../types";
import DaysList from "../../components/days-list/days-list";
import PointEdit from "../../components/point-edit/point-edit";
import { emptyPoint } from "../../const";

const Main: React.FC = (): JSX.Element => {
  const [currentSortType, setSortType] = useState<SortingType>(`event`);
  const setSortTypeHandler = (sortType: SortingType) => (
    evt: React.MouseEvent,
  ) => {
    evt.preventDefault();
    setSortType(sortType);
  };

  return (
    <>
      <Header />
      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          <section className="trip-events">
            <h2 className="visually-hidden">Trip events</h2>
            <Sorting
              setSortTypeHandler={setSortTypeHandler}
              currentSortType={currentSortType}
            />
            <ul className="trip-days">
              <PointEdit point={emptyPoint} />
              <DaysList currentSortType={currentSortType} />
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
