import React from 'react'
import { useForm } from 'react-hook-form'

export default ({ children }: any) => {
    const Children = children
    const methods: any = useForm()

    const handleSubmit: any = (form: any) => {
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit(methods.onSubmit)}>
            <Children {...methods} />
        </form>
    )
}