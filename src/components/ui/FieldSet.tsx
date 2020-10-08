import React from 'react'
import Subtitle from './Subtitle'

export default ({ children, title='Label' }: any) => {
    return (
        <React.Fragment>
            {(title) && <Subtitle text={title} />}
            <div className="fieldset">
                {children}
            </div>
        </React.Fragment>
    )
}