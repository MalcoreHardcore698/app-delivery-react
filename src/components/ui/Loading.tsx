import React from 'react'
import SVGLoader from '../../assets/images/loader.svg'

export default () => (
    <main>
        <div className="content loading">
            <img src={SVGLoader} alt="Loading..." />
        </div>
    </main>
)