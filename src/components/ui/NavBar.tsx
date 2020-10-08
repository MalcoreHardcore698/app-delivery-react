import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'

const props = {
    className: 'button',
    activeClassName: 'active'
}

export default () => {
    return (
        <div className="navbar">
           <Button component={() => <NavLink exact to="/offer" {...props}>Новый заказ</NavLink>}/>
           <Button component={() => <NavLink exact to="/reservation" {...props}>Новая бронь</NavLink>}/>
           <Button component={() => <NavLink exact to="/" {...props}>История заказов</NavLink>}/>
           <Button component={() => <NavLink exact to="/templates" {...props}>Шаблоны</NavLink>}/>
        </div>
    )
}