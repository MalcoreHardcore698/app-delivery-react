import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { useSelector, useDispatch } from 'react-redux'
import {
    forwardingRequestTemplates,
    forwardingRequestDeleteTemplate
} from '../../redux/creators'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteTemplate = (template: any) => {
        dispatch(forwardingRequestDeleteTemplate(template))
    }

    useEffect(() => {
        dispatch(forwardingRequestTemplates())
    }, [dispatch])
    
    return (    
        <div className="content">
            {(state.loading) ? <Loading /> :
            (state.templates.length > 0) ?
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