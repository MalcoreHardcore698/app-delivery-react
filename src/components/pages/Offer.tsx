import React from 'react'
import Router from './../ui/Router'
import { RouteProps } from './../ui/Router'
import {
    Introduction,
    Services,
    Preview,
    Conclusion
} from '../content/Document'

const members: any = [
    { value: 'sender', label: 'Отправитель' },
    { value: 'reciever', label: 'Получатель' }
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