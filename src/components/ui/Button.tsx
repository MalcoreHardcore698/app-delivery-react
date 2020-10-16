import React from 'react'

interface ButtonProps {
    children?: any,
    component?: any,
    classNames?: string,
    disabled?: boolean,
    type?: any,
    onClick?: any
}

export default ({
    type,
    children,
    component,
    classNames,
    disabled=false,
    onClick
}: ButtonProps) => {
    if (component) {
        const Component = component
        return <Component />
    }

    const handleClick: any = () => {
        if (onClick && !disabled) onClick()
    }

    return (
        <button
            type={type ?? 'text'}
            className={classNames}
            disabled={disabled}
            onClick={handleClick}
        >
            {children ?? 'Unknown Text'}
        </button>
    )
}