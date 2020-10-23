import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from 'react-modal-hook'
import Row from './../ui/Row'
import Button from './../ui/Button'
import Loading from '../ui/Loading'
import Template from '../modals/Template'
import { clearForm } from '../../redux/actions'
import { forwardingRequest } from '../../redux/creators'

export default ({ jump, text="Сохранить шаблон" }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [showModal, hideModal] = useModal(() =>
        <Template jump={jump} hideModal={hideModal} />
    , [jump])

    const handleForwardingRequest = () => {
        dispatch(forwardingRequest())
        dispatch(clearForm())
        jump('/forwarding')
    }

    if (state.loading && !state.form.id)
        return <Loading />

    return (
        <React.Fragment>
            <h2>Заказ №{state.forwardingRequest.id} создан!</h2>
            <Row>
                <Button onClick={showModal}>{text}</Button>
                <Button onClick={handleForwardingRequest} classNames="accent">Новая заявка</Button>
            </Row>
        </React.Fragment>
    )
}