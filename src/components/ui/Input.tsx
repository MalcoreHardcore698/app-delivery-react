import React from 'react'

interface InputProps {
    inputRef?: any,
    name?: string,
    type?: string,
    placeholder?: string,
    hidden?: boolean
}

export default ({
    name,
    type,
    inputRef,
    placeholder,
    hidden=false
}: InputProps) => {
    return (
        <input
            name={name}
            ref={inputRef}
            type={type ?? 'text'}
            className={(hidden) ? 'hidden' : ''}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}