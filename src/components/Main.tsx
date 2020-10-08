import React, { Suspense } from 'react'
import NavBar from './ui/NavBar'
import Loading from './ui/Loading'

export default ({ children }: any) => (
    <main>
        <NavBar />
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    </main>
)