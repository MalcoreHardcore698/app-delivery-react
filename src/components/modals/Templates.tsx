import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import Row from './../ui/Row'
import Subtitle from './../ui/Subtitle'
import Button from './../ui/Button'
import Message from './../ui/Message'
import { forwardingRequest, forwardingRequestTemplates } from '../../redux/creators'

export default ({ hideModal, setMore }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [id, setId] = useState()

    const handleSubmit = () => {
        if (id) {
            dispatch(forwardingRequest(id))
            hideModal()
            setMore(true)
        }
    }

    useEffect(() => {
        dispatch(forwardingRequestTemplates())
    }, [dispatch])

    return (
        <Modal isOpen>
            <Subtitle text="Выберите шаблон" />
            {(state.templates.length > 0) ? (
              <ul className="templates">
                {state.templates.map((template: any, index: number) =>
                  <li
                      key={index}
                      className={`template${(id === template.id) ? ' checked' : ''}${(state.templates.length === 1) ? ' alone' : ''}`}
                      onClick={() => setId((id === template.id) ? null : template.id)}
                  >
                      {template.name}
                  </li>
                )}
              </ul>
            ) : (
              <Row flex padding>
                <Message text="У вас нету сохраненных шаблонов" />
              </Row>
            )}
            <Row stretch>
                <Button disabled={!id} onClick={handleSubmit}>Загрузить</Button>
                <Button onClick={hideModal}>Отмена</Button>
            </Row>
        </Modal>
    )
}