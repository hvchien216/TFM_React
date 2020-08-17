import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './commons/style.scss';
import theme from './commons/theme';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ScrollToTop from './components/ScrollToTop';
import Account from './pages/Account';
import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword';
import CheckOut from './pages/CheckOut2';
import EditInfo from './pages/EditInfo';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import OrderDetail from './pages/OrderDetail';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import store from './redux/store';
import { fetchCategory } from './redux/actions/uiActions';
function App() {

  useEffect(() => {
    store.dispatch(fetchCategory());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <NavBar />
          <Switch>
            <PublicRoute restricted={false} path="/" component={Home} exact />
            <PublicRoute restricted={false} path="/collections/:category_id" component={Products} />
            <PublicRoute restricted={false} path="/search" component={Search} exact />
            <PublicRoute restricted={false} path="/product-detail/:maSP" component={ProductDetail} exact />
            <PublicRoute restricted={false} path="/cart" component={Cart} exact />
            <PublicRoute restricted={true} path="/signin" component={SignIn} exact />
            <PublicRoute restricted={true} path="/signup" component={SignUp} exact />
            <PrivateRoute path="/checkout" component={CheckOut} exact />
            <PrivateRoute path="/account" component={Account} exact />
            <PrivateRoute path="/order-detail/:code" component={OrderDetail} exact />
            <PrivateRoute path="/account/edit" component={EditInfo} exact />
            <PrivateRoute path="/account/change-password" component={ChangePassword} exact />
            <PublicRoute restricted={false} component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
