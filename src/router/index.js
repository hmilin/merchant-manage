import React from 'react';
import {Route,Switch,HashRouter,Redirect} from 'react-router-dom';
import Index from '../components/index/index';
import Login from '../components/Login/login';

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path='/layout' component={ Index } />
      <Route path='/login' component={ Login }/>
      <Redirect to='/login' />
    </Switch>
  </HashRouter>
)

export default Routes;