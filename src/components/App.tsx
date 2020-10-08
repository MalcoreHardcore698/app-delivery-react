import React from 'react'
import { AuthContext } from './context/Auth'
import { useAuth } from '../hooks/auth.hook'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import '../assets/styles/App.css'

export default () => {
  const { sessionID, login, logout } = useAuth()
  const isAuthenticated = !!sessionID

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