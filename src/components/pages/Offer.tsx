import React from 'react'
import { RouteProps } from './../ui/Router'
import Router from './../ui/Router'
import {
    Introduction,
    Services,
    Preview,
    Conclusion
} from '../content/Document'

const members: any = [
    { value: 'sender', label: 'Отправитель', field: 'senderItemsList' },
    { value: 'recipient', label: 'Получатель', field: 'recipientItemsList' }
]

const routes: Array<RouteProps> = [
    {
        path: '/',
        component: ({ jump, back }: any) =>
            <Introduction jump={jump} back={back} members={members} />
    },
    {
        path: '/services',
        component: ({ jump, back }: any) =>
            <Services jump={jump} back={back} />
    },
    {
        path: '/preview',
        component: ({ jump, back }: any) =>
            <Preview jump={jump} back={back} />
    },
    {
        path: '/done',
        component: ({ jump, back }: any) =>
            <Conclusion jump={jump} back={back} />
    }
]

export default () => (
    <div className="content">
        <Router home="/" routes={routes} />
    </div>
)