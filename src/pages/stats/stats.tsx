import React from "react";
import Statistics from "../../components/statistics/statistics";
import Header from "../../components/header/header";

const withoutLineStyle = {
  [`--after`]: `none`,
} as React.CSSProperties;

const Stats: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="page-body__page-main  page-main">
        <div className="page-body__container" style={withoutLineStyle}>
          <Statistics />
        </div>
      </main>
    </>
  );
};

export default Stats;
