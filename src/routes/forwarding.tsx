import React from 'react'
import Formation from '../components/ways/Formation'
import Addition from '../components/ways/Addition'
import Preview from '../components/ways/Preview'
import Conclusion from '../components/ways/Conclusion'
import { Member } from '../components/ui/Member'

const members: Member[] = [
    { value: 'sender', label: 'Отправитель', field: 'senderItemsList' },
    { value: 'recipient', label: 'Получатель', field: 'recipientItemsList' }
]

export default [
    {
        path: '/',
        component: ({ jump, back }: any) =>
            <Formation jump={jump} back={back} members={members} />
    },
    {
        path: '/addition',
        component: ({ jump, back }: any) =>
            <Addition jump={jump} back={back} />
    },
    {
        path: '/preview',
        component: ({ jump, back }: any) =>
            <Preview jump={jump} back={back} />
    },
    {
        path: '/conclusion',
        component: ({ jump, back }: any) =>
            <Conclusion jump={jump} back={back} />
    }
]