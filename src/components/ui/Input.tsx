import React from 'react'

interface InputProps {
    inputRef?: any,
    name?: string,
    type?: string,
    classNames?: string,
    placeholder?: string,
    defaultValue?: string,
    hidden?: boolean
}

export default ({
    name,
    type,
    inputRef,
    classNames,
    placeholder,
    defaultValue,
    hidden=false
}: InputProps) => {
    return (
        <input
            name={name}
            ref={inputRef}
            type={type ?? 'text'}
            className={`${(hidden) ? 'hidden ' : ''}${classNames}`}
            defaultValue={defaultValue}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}