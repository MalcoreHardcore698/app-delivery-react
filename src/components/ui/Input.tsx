import React from 'react'

interface InputProps {
    inputRef?: any,
    name?: string,
    type?: string,
    placeholder?: string,
    defaultValue?: string,
    hidden?: boolean
}

export default ({
    name,
    type,
    inputRef,
    placeholder,
    defaultValue,
    hidden=false
}: InputProps) => {
    return (
        <input
            name={name}
            ref={inputRef}
            type={type ?? 'text'}
            defaultValue={defaultValue}
            className={(hidden) ? 'hidden' : ''}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}