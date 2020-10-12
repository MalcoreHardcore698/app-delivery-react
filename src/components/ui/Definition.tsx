import React from 'react'

export interface DefinitionProps {
    text: string,
    detail: any
}

export default ({ text, detail }: DefinitionProps) => (
    <React.Fragment>
        <dt>{text}</dt>
        <dd>{detail}</dd>
    </React.Fragment>
)