import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Home/Home';
import Men from './Men/Men';
import Women from './Women/Women';
import Bag from './Bag/Bag';
import Product from './Product/Product';
import { BagProvider } from './BagContext';
import { QtyProvider } from './QtyContext';
import { FilterProvider } from './FilterContext';

function App() {
  return (
    <Router>
      <BagProvider>
      <QtyProvider>
      <FilterProvider>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/men" exact component={Men} />
          <Route path="/men/:id" component={Product} />
          <Route path="/women" exact component={Women} />
          <Route path="/women/:id" component={Product} />
          <Route path="/bag" component={Bag} />
        </Switch>
      </div>
      </FilterProvider>
      </QtyProvider>
      </BagProvider>
    </Router>
  );
}

export default App;
