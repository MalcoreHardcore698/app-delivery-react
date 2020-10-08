import React from 'react'
import Label from './Label'

export default ({ children, label='Label', position='left' }: any) => {
    return (
        <div className="field">
            {(position === 'left') && <Label>{label}</Label>}
            {children}
            {(position === 'right') && <Label>{label}</Label>}
        </div>
    )
}