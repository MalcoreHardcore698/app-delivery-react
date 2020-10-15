import React from 'react'
import DatePicker from 'react-datepicker'

export default ({ date }: any) => {
    return (
        <DatePicker
            selected={date}
            onChange={(e) => {

            }}
        />
    )
}