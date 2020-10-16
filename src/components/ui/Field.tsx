import React from 'react'
import Label from './Label'

export default ({ children, label, position='left' }: any) => {
    return (
        <div className="field">
            {(label && (position === 'left')) && <Label>{label}</Label>}
            {children}
            {(label && (position === 'right')) && <Label>{label}</Label>}
        </div>
    )
}