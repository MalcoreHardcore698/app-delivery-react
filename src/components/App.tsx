import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from './context/Auth'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import {
  auth,
  login,
  logout
} from '../redux/actions'
import '../assets/styles/App.css'

export default () => {
  const state: any = useSelector(state => state)
  const dispatch = useDispatch()

  const isAuthenticated = state.user

  useEffect(useCallback(() => {
    dispatch(auth())
  }, [dispatch]), [])

  return (
    <AuthContext.Provider value={{
      login, logout, isAuthenticated
    }}>
      <Router>
        <div className="App">
          <Layout isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}