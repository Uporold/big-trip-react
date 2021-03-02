import React, { useState } from "react";
import Header from "../../components/header/header";
import Sorting from "../../components/sorting/sorting";

const Main: React.FC = (): JSX.Element => {
  const [currentSortType, setSortType] = useState(`event`);
  const setSortTypeHandler = (sortType: string) => (evt: React.MouseEvent) => {
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
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
