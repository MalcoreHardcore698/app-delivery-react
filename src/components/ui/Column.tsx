import React from 'react'

export default ({ children, classNames='custom' }: { children: any, classNames?: string }) => (
    <div className={'column ' + classNames}>
        {children}
    </div>
)