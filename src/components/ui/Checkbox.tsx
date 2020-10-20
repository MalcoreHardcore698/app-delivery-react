import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface CheckmarkProps {
    value: string,
    label: string
}

interface CheckboxItemProps {
    item: CheckmarkProps,
    source?: any,
    onChange?: any
}

interface CheckboxProps {
    list: Array<CheckmarkProps>,
    source?: any,
    onChange?: any
}

const Checkbox = ({ item, source, onChange }: CheckboxItemProps) => {
    return (
        <div className={`checkbox${(source[item.value]) ? ' checked' : ''}`} onClick={() => onChange(item.value)}>
            <div className="checkmark">
                {(source[item.value]) && <FontAwesomeIcon icon={faCheck} />}
            </div>
            <label>{item.label}</label>
        </div>
    )
}

export default ({ list, source, onChange }: CheckboxProps) => {
    return (
        <div className="group-checkbox">
            {list.map((item: CheckmarkProps, index: number) =>
                <Checkbox key={index} item={item} source={source} onChange={onChange} />    
            )}
        </div>
    )
}