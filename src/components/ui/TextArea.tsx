import React from 'react'

interface TextAreaProps {
    inputRef?: any,
    name?: string,
    type?: string,
    placeholder?: string,
    hidden?: boolean
}

export default ({
    name,
    inputRef,
    placeholder,
    hidden=false
}: TextAreaProps) => {
    return (
        <textarea
            name={name}
            ref={inputRef}
            className={(hidden) ? 'hidden' : ''}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}