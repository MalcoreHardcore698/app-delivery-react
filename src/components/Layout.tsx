import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { RouteProps } from '../utils/interfaces'
import Auth from './pages/Auth'
import Header from './ui/Header'
import routes from '../routes'
import '../assets/styles/App.css'

export default ({ isAuthenticated }: any) => {
  return (
    <React.Fragment>
        <Header isAuthenticated={isAuthenticated} />
        <Switch>
            {(isAuthenticated) && (
                <React.Fragment>
                    {routes.map((props: RouteProps, index: number) =>
                        <Route key={index} {...props} />
                    )}
                    <Redirect to="/" />
                </React.Fragment>
            )}

            {(!isAuthenticated) && (
                <React.Fragment>
                    <Route exact path="/auth" render={() => <Auth />} />
                    <Redirect to="/auth" />
                </React.Fragment>
            )}
        </Switch>
    </React.Fragment>
  )
}