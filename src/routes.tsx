import React from 'react'
import Main from './components/Main'

const Home = React.lazy(() => import('./components/pages/Home'))
const View = React.lazy(() => import('./components/pages/View'))
const NotFound = React.lazy(() => import('./components/pages/NotFound'))

export default [
    {
        exact: true,
        path: '/',
        component: () => (
            <Main>
                <Home />
            </Main>
        )
    },
    {
        exact: true,
        path: '/:id/info',
        component: () => (
            <Main>
                <View />
            </Main>
        )
    },
    {
        component: () => (
            <Main>
                <NotFound />
            </Main>
        )
    }
]