import React, { lazy } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import store from '../store';
const Menu = lazy(() => import('./views/Menu'));
const Node = lazy(() => import('./views/Node'));
// import Menu from './views/Menu';

class Home extends React.Component {
  componentDidCatch(error: any, errInfo: React.ErrorInfo) {
    console.log(errInfo.componentStack); // 打印错误
    return false;
  }
  render() {
    return (
      <>
        <Route component={Menu} path="/react" exact></Route>
        <Route component={Node} path="/react/node"></Route>
        {/* <Redirect from="/react/node" to="/react/test" /> */}
      </>
    );
  }
}
export default Home;
