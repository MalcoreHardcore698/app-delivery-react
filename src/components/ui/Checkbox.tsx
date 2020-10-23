import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import InputHidden from './InputHidden'

export default ({
    type,
    name,
    list=[],
    inputRef,
    classNames,
    onChange
}: any) => {
    const classes = [
        'checkbox',
        classNames, type
    ]

    const [checked, setChecked] = useState([])

    const handlerChecked = (item: any) => {
        const founded: any = checked.find(el => el === item.value)
        const result: any = (founded)
            ? checked.filter(el => el !== item.value)
            : ([ ...checked, item.value ])

        if (onChange) onChange(result)
        setChecked(result)
    }

    return (
        <div className={classes.join(' ')}>
            <ul className="list">
                {list.map((item: any, key: number) =>
                    <li key={key} onClick={() => handlerChecked(item)} className={(checked.find(el => el === item.value)) ? 'checked' : 'empty'}>
                        <div className="checkmark">
                            {(checked.find(el => el === item.value)) && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                        <p>{item.label}</p>
                    </li>    
                )}
            </ul>
            <InputHidden name={name} inputRef={inputRef} />
        </div>
    )
}