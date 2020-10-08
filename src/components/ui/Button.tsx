import React from 'react'

interface ButtonProps {
    children?: any,
    component?: any,
    classNames?: string,
    type?: any,
    onClick?: any
}

export default ({
    type,
    children,
    component,
    classNames,
    onClick
}: ButtonProps) => {
    if (component) {
        const Component = component
        return <Component />
    }

    const handleClick: any = () => {
        if (onClick) onClick()
    }

    return (
        <button
            type={type ?? 'text'}
            className={classNames}
            onClick={handleClick}
        >
            {children ?? 'Unknown Text'}
        </button>
    )
}