import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { auth } from '../redux/creators'
import Layout from './Layout'
import '../assets/styles/App.css'

export default () => {
  const state: any = useSelector(state => state)
  const dispatch = useDispatch()

  const isAuthenticated = state.user

  useEffect(useCallback(() => {
    dispatch(auth())
  }, [dispatch]), [])

  return (
    <Router>
      <div className="App">
        <Layout isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  )
}