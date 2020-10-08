import React from 'react'

export default ({ children, htmlFor }: any) => {
    return (
        <label htmlFor={htmlFor}>{children}</label>
    )
}