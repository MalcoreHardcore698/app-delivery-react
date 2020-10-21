import React from 'react'

interface InputProps {
    name?: string,
    type?: string,
    inputRef?: any,
    disabled?: boolean,
    classNames?: string,
    placeholder?: string,
    defaultValue?: string,
    hidden?: boolean
}

export default ({
    name,
    type,
    inputRef,
    disabled,
    classNames,
    placeholder,
    defaultValue,
    hidden=false
}: InputProps) => {
    return (
        <input
            name={name}
            ref={inputRef}
            disabled={disabled}
            type={type ?? 'text'}
            className={`${(hidden) ? 'hidden ' : ''}${classNames}`}
            defaultValue={defaultValue}
            placeholder={placeholder ?? 'Введите'}
            autoComplete="off"
        />
    )
}