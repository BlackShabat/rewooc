import React, {Component} from "react";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router";
import Home from "./pages/Home/Home";
import Archive from "./pages/Archive/Archive";
import Page404 from "./pages/Page404/Page404";
import Cart from "./pages/Cart/Cart";

class Root extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path={["/shop", "/product-category/:slug"]} component={Archive}/>
          <Route path="/cart" component={Cart}/>
          <Route component={Page404}/>
        </Switch>
      </Layout>
    );
  }
}

export default Root;