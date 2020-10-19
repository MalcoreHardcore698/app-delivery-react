import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface CheckmarkProps {
    value: string,
    label: string
}

interface CheckboxItemProps {
    item: CheckmarkProps,
    onChange: any
}

interface CheckboxProps {
    list: Array<CheckmarkProps>,
    onChange?: any
}

const Checkbox = ({ item, onChange }: CheckboxItemProps) => {
    const state: any = useSelector(state => state)

    return (
        <div className={`checkbox${(state.form[item.value]) ? ' checked' : ''}`} onClick={() => onChange(item.value)}>
            <div className="checkmark">
                {(state.form[item.value]) && <FontAwesomeIcon icon={faCheck} />}
            </div>
            <label>{item.label}</label>
        </div>
    )
}

export default ({ list, onChange }: CheckboxProps) => {
    return (
        <div className="group-checkbox">
            {list.map((item: CheckmarkProps, index: number) =>
                <Checkbox key={index} item={item} onChange={onChange} />    
            )}
        </div>
    )
}