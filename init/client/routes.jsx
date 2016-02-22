import React from "react";
import { Route, IndexRoute } from "react-router";
import Page from "./containers/page";
import Home from "./components/home";
import ReactPage from "./components/<%= componentPath %>";

const routes = (
  <Route path="/" component={Page}>
    <IndexRoute component={Home} />
    <Route path="<%= componentPath %>" component={ReactPage} />
  </Route>
);

export default routes;
