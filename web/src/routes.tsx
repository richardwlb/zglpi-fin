import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Entities from './screens/EntitiesMap';
import EntitieDetails from './screens/EntitieDetails';
import Landing from './screens/Landing';
import HoursValue from './screens/HoursValue';
import Navbar from './components/Navbar';

const Routes: React.FC = () => {
    return(
      <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/clientes" exact component={Entities} />
            <Route path="/clientes/:id" component={EntitieDetails} />
            <Route path="/horas" component={HoursValue} />
          </Switch>
      </BrowserRouter>
    );
};

export default Routes;