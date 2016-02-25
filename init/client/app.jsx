/**
 * Client entry point.
 */
/*globals document:false */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, useRouterHistory } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

import routes from "./routes";
import createStore from "./store/create-store";

import "./styles/app.css";

const history = useRouterHistory(createBrowserHistory)();
const rootEl = document.getElementById("js-content");

// Although our Flux store is not a singleton, from the point of view of the
// client-side application, we instantiate a single instance here which the
// entire app will share. (So the client app _has_ an effective singleton).
let store = createStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>, rootEl
  );
};

// Try server bootstrap _first_ because doesn't need a fetch.
const serverBootstrapEl = document.querySelector(".js-bootstrap");
if (serverBootstrapEl) {
  try {
    const serverBootstrap = JSON.parse(serverBootstrapEl.innerHTML);
    store = createStore(serverBootstrap);
  /*eslint-disable no-empty*/
  } catch (err) { /* Ignore error. */ }
  /*eslint-enable no-empty*/
}

render();
