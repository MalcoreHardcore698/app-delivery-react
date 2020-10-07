import React, { Suspense } from 'react'
import Loading from './ui/Loading'

export default ({ children }: any) => (
    <main>
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    </main>
)