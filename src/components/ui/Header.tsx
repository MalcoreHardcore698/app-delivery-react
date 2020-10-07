import React from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import Logotype from '../../assets/logotype.png'

export default () => {
    const { logout } = useAuth()

    const handleSignout = () => {
        logout()
    }

    return (
        <header>
            <aside>
                <img src={Logotype} alt="Logotype" />
            </aside>

            <aside>
                <p className="company"></p>
                <Button onClick={handleSignout}>
                    <FontAwesomeIcon icon={faUser} />
                </Button>
            </aside>
        </header>
    )
}