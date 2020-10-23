import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import InputHidden from '../ui/InputHidden'

export default ({
    type,
    list=[],
    register,
    classNames,
    onChange
}: any) => {
    const classes = [
        'checkbox',
        classNames, type
    ]

    const [checklist, setChecklist] = useState(list)

    const handlerChecked = (item: any) => {
        if (onChange) onChange({ ...item, checked: !item.checked })
        setChecklist((prev: any) => prev.map((_item: any) => (_item.value === item.value) ? ({
            ..._item,
            checked: !_item.checked
        }) : _item ))
    }

    return (
        <div className={classes.join(' ')}>
            <ul className="list">
                {checklist.map((item: any, key: number) =>
                    <li key={key} onClick={() => handlerChecked(item)} className={(item.checked) ? 'checked' : 'empty'}>
                        <div className="checkmark">
                            {(item.checked) && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                        <p>{item.label}</p>
                    </li>    
                )}
            </ul>
            {list.map((item: any, key: number) => <InputHidden key={key} name={item.value} inputRef={register} />)}
        </div>
    )
}