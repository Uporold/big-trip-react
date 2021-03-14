import React from "react";
import Header from "../../components/header/header";
import Sorting from "../../components/sorting/sorting";
import { SortingType } from "../../types";
import DaysList from "../../components/days-list/days-list";
import PointEdit from "../../components/point-edit/point-edit";
import { emptyPoint, Mode } from "../../const";
import { useCurrentSortType, useMode } from "../../redux/app/hooks/selectors";
import { useSetSortType } from "../../redux/app/hooks/useSetSortType";
import { usePointsLoadingStatus } from "../../redux/data/hooks/selectors";

const Main: React.FC = (): JSX.Element => {
  const mode = useMode();
  const currentSortType = useCurrentSortType();
  const setSortType = useSetSortType();
  const setSortTypeHandler = (sortType: SortingType) => (
    evt: React.MouseEvent,
  ) => {
    evt.preventDefault();
    setSortType(sortType);
  };

  const isPointsLoading = usePointsLoadingStatus();
  return (
    <>
      <Header />
      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          {!isPointsLoading ? (
            <section className="trip-events">
              <h2 className="visually-hidden">Trip events</h2>
              <Sorting
                setSortTypeHandler={setSortTypeHandler}
                currentSortType={currentSortType}
              />
              <ul className="trip-days">
                {mode === Mode.ADDING ? <PointEdit point={emptyPoint} /> : ``}
                <DaysList currentSortType={currentSortType} />
              </ul>
            </section>
          ) : (
            <p className="trip-events__msg">Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Main;
