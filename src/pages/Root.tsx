import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from './Home/Home'
import Catalog from './Catalog/Catalog'
import Page404 from './Page404/Page404'
import Cart from './Cart/Cart'
import SignIn from './SignIn/SignIn'
import SignOut from './SignOut/SignOut'
import Account from './Account/Account'

function Root() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home  />
        </Route>
        <Route
          path={['/shop', '/product-category/:slug']}
          render={() => <Catalog />}
        />
        <Route path="/cart" component={Cart} />
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/my-account">
          <Account />
        </Route>
        <Route path="/sign-out" component={SignOut} />
        <Route component={Page404} />
      </Switch>
    </Layout>
  )
}

export default Root