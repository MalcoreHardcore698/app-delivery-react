import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

interface RadiomarkProps {
    value: string,
    label: string
}

interface RadioboxItemProps {
    name: string,
    item: RadiomarkProps,
    onChange: any
}

interface RadioboxProps {
    name: string,
    list: Array<RadiomarkProps>,
    onChange?: any
}

const Radiobox = ({ item, name, onChange }: RadioboxItemProps) => {
    const state: any = useSelector(state => state)

    return (
        <div
            className={`radiobox${(state.form[name] === item.value) ? ' checked' : ''}`}
            onClick={() => onChange(item)}
        >
            <div className="radiomark">
                {(state.form[name] === item.value) && <FontAwesomeIcon icon={faCircle} />}
            </div>
            <label>{item.label}</label>
        </div>
    )
}

export default ({ name, list, onChange }: RadioboxProps) => {
    return (
        <div className="group-radiobox">
            {list.map((item: RadiomarkProps, index: number) =>
                <Radiobox
                    key={index}
                    item={item}
                    name={name}
                    onChange={onChange}
                />    
            )}
        </div>
    )
}