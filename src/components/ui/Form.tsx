import React from 'react'
import { useForm } from 'react-hook-form'

export default ({ children, onSubmit }: any) => {
    const Children = children
    const methods: any = useForm()

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Children {...methods} />
        </form>
    )
}