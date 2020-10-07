import React from 'react'
import Select from 'react-select'

interface SelectItemProps {
    label: string,
    value: string
}

interface SelectProps {
    list: Array<SelectItemProps>
}

export default ({ list }: SelectProps) => {
    return (
        <Select
            options={list}
            onChange={(e) => {

            }}
        />
    )
}