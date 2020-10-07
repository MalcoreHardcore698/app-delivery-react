import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Input from './Input'

interface CheckmarkProps {
    value: string,
    label: string
}

interface CheckboxItemProps {
    item: CheckmarkProps,
    checked: Array<CheckmarkProps>,
    onClick: Function
}

interface CheckboxProps {
    list: Array<CheckmarkProps>
}

const Checkbox = ({ item, checked, onClick }: CheckboxItemProps) => {
    const handleClick = () => {
        onClick((prev: Array<CheckmarkProps>) =>
            prev.filter((elem: CheckmarkProps) =>
                (elem.value === item.value) ? false : item)
        )
    }

    return (
        <div
            className={`checkbox${checked.find((elem: CheckmarkProps) => elem.value === item.value)}`}
            onClick={handleClick}
        >
            <div className="checkmark">
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <label>{item.label}</label>
            <Input hidden />
        </div>
    )
}

export default ({ list }: CheckboxProps) => {
    const [checked, setChecked] = useState([])

    return (
        <div className="group-checkbox">
            {list.map((item: CheckmarkProps, index: number) =>
                <Checkbox
                    key={index}
                    item={item}
                    checked={checked}
                    onClick={setChecked}
                />    
            )}
        </div>
    )
}