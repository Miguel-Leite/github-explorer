import React from "react";
import { Switch, Route } from 'react-router-dom'

import Dashboard from "../pages/dashboard";
import Repository from "../pages/repository";

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route path='/repositories/:repository+' component={Repository} />
  </Switch>
)

export default Routes;