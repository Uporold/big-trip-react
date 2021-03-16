import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Main from "../../pages/main/main";
import Header from "../header/header";
import { usePointsLoadingStatus } from "../../redux/data/hooks/selectors";
import history from "../../history";
import Stats from "../../pages/stats/stats";
import { PagePath } from "../../const";

const App: React.FC = (): JSX.Element => {
  const isPointsLoading = usePointsLoadingStatus();
  return (
    <>
      {!isPointsLoading ? (
        <>
          <Router history={history}>
            <Switch>
              <Route exact path={PagePath.MAIN} component={Main} />
              <Route exact path={PagePath.STATS} component={Stats} />
            </Switch>
          </Router>
        </>
      ) : (
        <p className="trip-events__msg">Loading...</p>
      )}
    </>
  );
};

export default App;
