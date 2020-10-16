import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import { forwardingRequest } from '../../redux/actions'

const props = {
    className: 'button',
    activeClassName: 'active'
}

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleForwardingRequest = () => {
        dispatch(forwardingRequest())
    }

    return (
        <div className="navbar">
           <Button disabled={state.loading} component={() => <NavLink exact to="/offer" onClick={handleForwardingRequest} {...props}>Новый заказ</NavLink>}/>
           <Button disabled={state.loading} component={() => <NavLink exact to="/reservation" onClick={handleForwardingRequest} {...props}>Новая бронь</NavLink>}/>
           <Button disabled={state.loading} component={() => <NavLink exact to="/" {...props}>История заказов</NavLink>}/>
           <Button disabled={state.loading} component={() => <NavLink exact to="/templates" {...props}>Шаблоны</NavLink>}/>
        </div>
    )
}