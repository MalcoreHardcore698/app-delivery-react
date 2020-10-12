import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from './context/Auth'
import { useAuth } from '../hooks/auth.hook'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import { saveTemplate, addToHistory } from '../redux/actions'
import { loadLocalStorage, saveLocalStorage } from '../utils/functions'
import { localStorageKey } from '../utils/config'
import '../assets/styles/App.css'

export default () => {
  const { sessionID, login, logout } = useAuth()
  const isAuthenticated = !!sessionID

  const state: any = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const data = loadLocalStorage(localStorageKey)

      data?.history.map((document: any) => dispatch(addToHistory(document)))
      data?.templates.map((template: any) => dispatch(saveTemplate(template)))
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  useEffect(() => {
      saveLocalStorage(localStorageKey, state)
  }, [state])

  return (
    <AuthContext.Provider value={{
      sessionID, login, logout, isAuthenticated
    }}>
      <Router>
        <div className="App">
          <Layout isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}