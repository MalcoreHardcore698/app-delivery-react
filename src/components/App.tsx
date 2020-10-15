import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from './context/Auth'
import { useRequest } from '../hooks/request.hook'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import Loading from './ui/Loading'
import Error from './ui/Error'
import {
  saveTemplate,
  addToHistory,
  login,
  logout
} from '../redux/actions'
import { loadLocalStorage, saveLocalStorage } from '../utils/functions'
import { apiHost, localStorageKey } from '../utils/config'
import '../assets/styles/App.css'

export default () => {
  const { request, error, loading } = useRequest()

  const [isAuthenticated, setAuthenticate] = useState(false)

  const state: any = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const fetching = async () => {
          const url = `${apiHost}/forwardingnote`
          const data = await request(url)
  
          const local = loadLocalStorage(localStorageKey)
          if (Array.isArray(data))
            data?.map((document: any) => dispatch(addToHistory(document)))
          else
            local?.history?.map((document: any) => dispatch(addToHistory(document)))
          local?.templates?.map((template: any) => dispatch(saveTemplate(template)))
        }
  
        fetching()
      } catch (err) {
        console.log(err)
      }
    }
  }, [dispatch, request])

  useEffect(() => {
    saveLocalStorage(localStorageKey, state)
  }, [state])

  if (loading)
    return <Loading />

  if (error)
    return <Error />

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