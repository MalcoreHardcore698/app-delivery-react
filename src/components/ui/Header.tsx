import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import Logotype from '../../assets/images/logo.png'

export default () => {
    const { logout, isAuthenticated } = useContext(AuthContext)

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
                {(isAuthenticated) && (
                    <Button onClick={handleSignout}>
                        <FontAwesomeIcon icon={faUser} />
                    </Button>
                )}
            </aside>
        </header>
    )
}