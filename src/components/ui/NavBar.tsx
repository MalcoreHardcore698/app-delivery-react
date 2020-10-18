import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import { forwardingRequest } from '../../redux/creators'

const props = {
    className: 'button',
    activeClassName: 'active'
}

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const isLoading = state.loading
    const classes = `button${(isLoading) ? ' disabled' : ''}`

    const handleForwardingRequest = (e: any) => {
        const isActive = e.target.classList.contains('active')

        if (isLoading && isActive) e.preventDefault()
        else dispatch(forwardingRequest())
    }

    const links = [
        { text: 'Новый заказ', path: '/offer', onClick: handleForwardingRequest, className: classes },
        { text: 'Новая бронь', path: '/reservation', onClick: handleForwardingRequest, className: classes },
        { text: 'История заказов', path: '/', onClick: () => {}, className: classes },
        { text: 'Шаблоны', path: '/templates', onClick: () => {}, className: classes }
    ]

    return (
        <div className="navbar">
            {links.map((link: any) => (
                <Button component={() => (
                    <NavLink
                        exact {...props}
                        to={link.path}
                        className={link.className}
                        onClick={link.onClick}
                    >
                        {link.text}
                    </NavLink>
                )}/>
            ))}
        </div>
    )
}