import React from 'react'
import Main from '../components/Main'

const History = React.lazy(() => import('../components/pages/History'))
const Forwarding = React.lazy(() => import('../components/pages/Forwarding'))
const Templates = React.lazy(() => import('../components/pages/Templates'))

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
        path: '/forwarding',
        component: () => (
            <Main>
                <Forwarding />
            </Main>
        )
    },
    {
        exact: true,
        path: '/reservation',
        component: () => (
            <Main>
                <Forwarding />
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