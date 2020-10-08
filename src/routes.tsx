import React from 'react'
import Main from './components/Main'

const History = React.lazy(() => import('./components/pages/History'))
const Offer = React.lazy(() => import('./components/pages/Offer'))
const Reservation = React.lazy(() => import('./components/pages/Reservation'))
const Templates = React.lazy(() => import('./components/pages/Templates'))

export default [
    {
        exact: true,
        path: '/',
        component: () => (
            <Main>
                <History />
            </Main>
        )
    },
    {
        exact: true,
        path: '/offer',
        component: () => (
            <Main>
                <Offer />
            </Main>
        )
    },
    {
        exact: true,
        path: '/reservation',
        component: () => (
            <Main>
                <Reservation />
            </Main>
        )
    },
    {
        exact: true,
        path: '/templates',
        component: () => (
            <Main>
                <Templates />
            </Main>
        )
    }
]