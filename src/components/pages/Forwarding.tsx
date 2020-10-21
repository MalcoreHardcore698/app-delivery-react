import React from 'react'
import Router from '../ui/Router'
import forwarding from '../../routes/forwarding'

export default () => (
    <div className="content">
        <Router home="/" routes={forwarding} />
    </div>
)