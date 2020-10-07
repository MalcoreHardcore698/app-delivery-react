import React from 'react'

interface ButtonProps {
    children?: any,
    component?: any,
    type?: any,
    onClick?: any
}

export default ({
    type,
    children,
    component,
    onClick
}: ButtonProps) => {
    if (component) {
        const Component = component
        return (
            <Component>
                {children ?? 'Link'}
            </Component>
        )
    }

    return (
        <button
            type={type ?? 'text'}
            onClick={onClick}
        >
            {children ?? 'Unknown Text'}
        </button>
    )
}