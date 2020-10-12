import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Input from './Input'

interface CheckmarkProps {
    value: string,
    label: string
}

interface CheckboxItemProps {
    name?: string,
    inputRef?: any,
    item: CheckmarkProps,
    checked: Array<CheckmarkProps>,
    onClick: Function,
    onChange: any
}

interface CheckboxProps {
    name?: string,
    inputRef?: any,
    list: Array<CheckmarkProps>,
    onChange?: any
}

const Checkbox = ({ item, inputRef, name, checked, onClick, onChange }: CheckboxItemProps) => {
    const handleClick = () => {
        const founded = checked.find((elem: any) => elem.value === item.value)
        const result = (founded)
            ? checked.filter((elem: any) => elem.value !== item.value)
            : ([ ...checked, item ])

        if (onChange) onChange(result)
        onClick(result)
    }

    return (
        <div
            className={`checkbox${(checked.find((elem: CheckmarkProps) =>
                (elem.value === item.value))) ? ' checked' : ''}`}
            onClick={handleClick}
        >
            <div className="checkmark">
                {(checked.find((elem: CheckmarkProps) =>
                (elem.value === item.value))) && <FontAwesomeIcon icon={faCheck} />}
            </div>
            <label>{item.label}</label>
            <Input inputRef={inputRef} name={name} hidden />
        </div>
    )
}

export default ({ inputRef, name, list, onChange }: CheckboxProps) => {
    const [checked, setChecked] = useState([])

    return (
        <div className="group-checkbox">
            {list.map((item: CheckmarkProps, index: number) =>
                <Checkbox
                    key={index}
                    item={item}
                    inputRef={inputRef}
                    name={name}
                    checked={checked}
                    onClick={setChecked}
                    onChange={onChange}
                />    
            )}
        </div>
    )
}