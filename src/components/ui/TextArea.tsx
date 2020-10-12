import React from 'react'

interface TextAreaProps {
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
    inputRef,
    classNames,
    placeholder,
    defaultValue,
    hidden=false
}: TextAreaProps) => {
    return (
        <textarea
            name={name}
            ref={inputRef}
            defaultValue={defaultValue}
            className={`${(hidden) ? 'hidden ' : ''}${classNames}`}
            placeholder={placeholder ?? 'Введите'}
        />
    )
}