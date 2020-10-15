import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import { forwardingRequest } from '../../redux/actions'

const props = {
    className: 'button',
    activeClassName: 'active'
}

export default () => {
    const dispatch = useDispatch()

    const handleForwardingRequest = () => {
        dispatch(forwardingRequest())
    }

    return (
        <div className="navbar">
           <Button component={() => <NavLink exact to="/offer" onClick={handleForwardingRequest} {...props}>Новый заказ</NavLink>}/>
           <Button component={() => <NavLink exact to="/reservation" {...props}>Новая бронь</NavLink>}/>
           <Button component={() => <NavLink exact to="/" {...props}>История заказов</NavLink>}/>
           <Button component={() => <NavLink exact to="/templates" {...props}>Шаблоны</NavLink>}/>
        </div>
    )
}