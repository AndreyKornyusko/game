import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import MainPage from '../pages/MainPage';
// import FighterPage from '../pages/FighterPage';
import routes from '../configs/routes';
import './App.css';



const StartPage = lazy(() =>
  import('../pages/StartPage/StartPage' /* webpackChunkName: "StartPage-page" */),
);

const MainPage = lazy(() =>
  import('../pages/MainPage' /* webpackChunkName: "main-page" */),
);

const FighterPage = lazy(() =>
  import('../pages/FighterPage' /* webpackChunkName: "FighterPage-page" */),
);

const GamePage = lazy(() =>
  import('../pages/GamePage' /* webpackChunkName: "GamePage-page" */),
);

const App = () => (
  <div className="mainWrapper">
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path={routes.START} component={StartPage} />
        <Route exact path={routes.MAIN} component={MainPage} />
        <Route exact path={routes.FIGHTERID} component={FighterPage} />
        <Route exact path={routes.GAMEID} component={GamePage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </div >

);

export default App;
