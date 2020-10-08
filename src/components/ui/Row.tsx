import React from 'react'

export default ({ children, stretch }: any) => (
    <div className={`row${(stretch) ? ' stretch' : ''}`}>
        {children}
    </div>
)