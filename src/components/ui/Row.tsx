import React from 'react'

export default ({ children, grid, col2, stretch, padding }: any) => (
    <div className={`row${
        (stretch) ? ' stretch' : ''}${
        (padding) ? ' padding' : ''}${
        (grid) ? ' grid' : ''}${
        (col2) ? ' col2' : ''}`
    }>
        {children}
    </div>
)