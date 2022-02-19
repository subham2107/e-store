import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';



function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/category/:categoryName" component={ProductList}/>
          <Route exact path="/product/:productId" component={ProductDetail}/>
          <Route exact path="/cart" component={CartPage}/>
          <Route exact path="/profile" component={Profile} />
        </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
