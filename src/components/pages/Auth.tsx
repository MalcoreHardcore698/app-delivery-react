import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { useDispatch } from 'react-redux'
import Form from './../ui/Form'
import Input from './../ui/Input'
import Button from './../ui/Button'
import { login } from '../../redux/actions'

export default () => {
    const auth: any = useContext(AuthContext)
    const dispatch = useDispatch()

    const handleSubmit: any = (form: any) => {
        dispatch(login(form))
        auth.login(form?.login)
    }

    return (
        <main className="thin">
            <div className="content">
                <h1 className="title">Личный кабинет</h1>
                <Form onSubmit={handleSubmit}>
                    {({ register }: any) => (
                        <React.Fragment>
                            <Input inputRef={register()} name="login" type="text" placeholder="Login" />
                            <Input inputRef={register()} name="password" type="password" placeholder="Password" />
                            <Button type="submit" classNames="accent">Войти</Button>
                        </React.Fragment>
                    )}
                </Form>
            </div>
        </main>
    )
}