import React from "react";
import Header from "../../components/header/header";

const Main = () => {
  return (
    <>
      <Header />
      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          <section className="trip-events">
            <h2 className="visually-hidden">Trip events</h2>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
