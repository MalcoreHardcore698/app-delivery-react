import React from 'react'
import Router from '../ui/Router'
import reservation from '../../routes/reservation'

export default () => (
    <div className="content">
        <Router home="/" routes={reservation} />
    </div>
)