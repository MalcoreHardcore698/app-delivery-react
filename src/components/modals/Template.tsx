import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Subtitle from './../ui/Subtitle'
import Input from './../ui/Input'
import Button from './../ui/Button'
import { forwardingRequestSaveTemplate } from '../../redux/creators'

export default ({ jump, hideModal }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (form: any) => {
        dispatch(forwardingRequestSaveTemplate(state.form.id, form.name))

        hideModal()
        jump('/')
    }

    return (
        <Modal isOpen>
            <Form onSubmit={handleSubmit}>
                {({ register, errors }: any) => (
                    <React.Fragment>
                        <Subtitle text="Введите название шаблона" />
                        <Row stretch padding>
                            <Input
                                type="text"
                                name="name"
                                inputRef={register({ required: true })}
                                classNames={(errors && errors.name) ? 'required' : ''}
                                placeholder="Название шаблона"
                            />
                        </Row>
                        <Row stretch>
                            <Button type="submit">Сохранить шаблон</Button>
                            <Button onClick={hideModal}>Отмена</Button>
                        </Row>
                    </React.Fragment>
                )}
            </Form>
        </Modal>
    )
}