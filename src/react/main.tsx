import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact, { Lifecycles } from 'single-spa-react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import store from '../store';
import Home from './Home';
import PageLoading from './components/PageLoading';

function domElementGetter(): HTMLElement {
  return document.getElementById('react') as HTMLElement;
}

const reactLifeCycles: Lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => (
    <Provider store={store}>
      <Suspense fallback={<PageLoading transparent={0.5} />}>
        <Router>
          <Switch>
            <Home />
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  ),
  domElementGetter,
});

export const bootstrap = [reactLifeCycles.bootstrap];

export const mount = [reactLifeCycles.mount];

export const unmount = [reactLifeCycles.unmount];
