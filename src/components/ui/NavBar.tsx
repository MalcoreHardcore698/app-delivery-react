import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'

export default () => {
    return (
        <div className="navbar">
           <Button component={() => <NavLink to="/" activeClassName="active" />}>
                Новый заказ
            </Button>

           <Button component={() => <NavLink to="/reservation" activeClassName="active" />}>
                Новая бронь
            </Button>

           <Button component={() => <NavLink to="/history" activeClassName="active" />}>
                История заказов
            </Button>

           <Button component={() => <NavLink to="/templates" activeClassName="active" />}>
                Шаблоны
            </Button>
        </div>
    )
}