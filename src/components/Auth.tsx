import React from 'react'
import Form from './Form'
import Input from './Input'
import Button from './Button'

export default () => {
    return (
        <Form>
            {({ register }: any) => (
                <React.Fragment>
                    <Input inputRef={register()} type="text" placeholder="Login" />
                    <Input inputRef={register()} type="password" placeholder="Password" />
                    <Button type="submit">
                        Войти
                    </Button>
                </React.Fragment>
            )}
        </Form>
    )
}