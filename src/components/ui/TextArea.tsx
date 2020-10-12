import React from 'react'

interface TextAreaProps {
    inputRef?: any,
    name?: string,
    type?: string,
    placeholder?: string,
    defaultValue?: string,
    hidden?: boolean
}

export default ({
    name,
    inputRef,
    placeholder,
    defaultValue,
    hidden=false
}: TextAreaProps) => {
    return (
        <textarea
            name={name}
            ref={inputRef}
            defaultValue={defaultValue}
            className={(hidden) ? 'hidden' : ''}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}