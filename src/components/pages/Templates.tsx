import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../ui/Button'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTemplate } from '../../redux/actions'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteTemplate = (template: any) => {
        dispatch(deleteTemplate(template))
    }
    
    return (    
        <div className="content">
            {(state.templates.length > 0) ?
                <ul className="templates">
                    {state.templates.map((template: any) =>
                        <li className="template" key={template.id}>
                            <p className="name">{template.cityFrom}-{template.cityTo}</p>
                            <Button classNames="icon" onClick={() => handleDeleteTemplate(template)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </li>    
                    )}
                </ul>
            : <p>Отсутствуют шаблоны</p>}
        </div>
    )
}