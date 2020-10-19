import React from 'react'
import { useDispatch } from 'react-redux'
import Form from './../ui/Form'
import Input from './../ui/Input'
import Button from './../ui/Button'
import { login } from '../../redux/creators'

export default () => {
    const dispatch = useDispatch()

    const handleSubmit: any = (form: any) => {
        dispatch(login(form))
    }

    return (
        <main className="thin">
            <div className="content">
                <h1 className="title">Личный кабинет</h1>
                <Form onSubmit={handleSubmit}>
                    {({ register, errors }: any) => (
                        <React.Fragment>
                            <Input
                                classNames={(errors && errors.tin) ? 'required' : ''}
                                inputRef={register({ required: true })}
                                name="tin"
                                type="text"
                                placeholder="Логин"
                            />
                            <Input
                                classNames={(errors && errors.password) ? 'required' : ''}
                                inputRef={register({ required: true })}
                                name="password"
                                type="password"
                                placeholder="Пароль"
                            />
                            <Button type="submit" classNames="accent">Войти</Button>
                        </React.Fragment>
                    )}
                </Form>
            </div>
        </main>
    )
}