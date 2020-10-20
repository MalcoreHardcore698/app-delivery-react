import React from 'react'

export default ({ children, stretch, padding }: any) => (
    <div className={`row${(stretch) ? ' stretch' : ''}${(padding) ? ' padding' : ''}`}>
        {children}
    </div>
)