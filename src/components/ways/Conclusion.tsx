import React from 'react'
import { useSelector } from 'react-redux'
import { useModal } from 'react-modal-hook'
import Row from './../ui/Row'
import Button from './../ui/Button'
import Loading from '../ui/Loading'
import Template from '../modals/Template'

export default ({ jump, text="Сохранить шаблон" }: any) => {
    const state: any = useSelector(state => state)

    const [showModal, hideModal] = useModal(() =>
        <Template jump={jump} hideModal={hideModal} />
    , [jump])

    if (state.loading && !state.form.id)
        return <Loading />

    return (
        <React.Fragment>
            <h2>Заказ создан!</h2>
            <Row>
                <Button onClick={showModal}>{text}</Button>
                <Button onClick={() => jump('/offer')} classNames="accent">Новая заявка</Button>
            </Row>
        </React.Fragment>
    )
}