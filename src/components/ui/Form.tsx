import React from 'react'
import { useForm } from 'react-hook-form'

export default ({ children, onSubmit }: any) => {
    const Children = children
    const methods: any = useForm()

    const handleSubmit: any = async (form: any) => {
        // console.log(form)
        await onSubmit(form)
    }

    return (
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Children {...methods} />
        </form>
    )
}