import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import { logout } from '../../redux/creators'
import Logotype from '../../assets/images/logo.png'

export default ({ isAuthenticated }: any) => {
    const dispatch = useDispatch()

    const handleSignout = () => {
        dispatch(logout())
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