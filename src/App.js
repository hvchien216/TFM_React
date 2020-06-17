import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './commons/style.scss';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Cart from './pages/Cart';
import Home from './pages/Home';
import store from './redux/store';
import CheckOut from './pages/CheckOut';
import { ThemeProvider } from '@material-ui/core';
import theme from './commons/theme';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/products/:maBrand" component={Products} />
            <Route path="/product-detail/:maSP" exact component={ProductDetail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={CheckOut} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
