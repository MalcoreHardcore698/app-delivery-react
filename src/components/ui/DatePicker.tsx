import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'

registerLocale('ru', ru)

export default (props: any) => {
    return (
        <DatePicker {...props} />
    )
}