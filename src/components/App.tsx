import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from './context/Auth'
import { useAuth } from '../hooks/auth.hook'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RouteProps } from '../utils/interfaces'
import { fetchPosts } from '../redux/actions'
import Auth from './Auth'
import routes from '../routes'
import '../assets/styles/App.css'

export default () => {
  const { sessionID, login, logout } = useAuth()
  const isAuthenticated = !!sessionID

  const dispatch: any = useDispatch()

  useEffect(() => {
      dispatch(fetchPosts())
  }, [dispatch])

  return (
    <AuthContext.Provider value={{
      sessionID, login, logout, isAuthenticated
    }}>
      <div className="App">
        <Router>
          <Switch>
            {(isAuthenticated) && (
              routes.map((props: RouteProps, index: number) =>
                <Route key={index} {...props} />
              )
            )}

            {(!isAuthenticated) && (
              <Route exact path="/auth" render={() => <Auth />} />
            )}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}