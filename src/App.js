import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './commons/style.scss';
import theme from './commons/theme';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import store from './redux/store';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
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
