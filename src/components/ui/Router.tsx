import React, { useState } from 'react'
import { getPath } from '../../utils/functions'

export interface SwitchProps {
    children: any | string,
    path: string
}

export interface ComponentProps {
    component: any | string,
    back?: Function,
    jump?: Function
}

export interface RouteProps {
    path: string,
    component: any
}

export interface RouterProps {
    home: string,
    routes: Array<RouteProps>
}

export const Switch = ({ children, path }: SwitchProps) => {
    const Childrens = children
    if (!Childrens) return null

    let Child = null
    for (const child of Childrens) {
        if (path === child.props.path) {
            Child = child
            break
        }
    }
    return Child
}

export const Route = ({ component, back, jump }: ComponentProps) => {
    const Component = component
    return <Component
        back={back}
        jump={jump}
    />
}

export default ({ home, routes }: RouterProps) => {
    const [navigator, setNavigator] = useState([home])

    const handlerBack = () => {
        setNavigator([
            ...navigator.filter((e, i) => (i !== (navigator.length - 1)))
        ])
    }
    const handlerJump = (path: string) => {
        setNavigator([
            ...navigator,
            path
        ])
    }

    return (
        <Switch path={getPath(navigator) ?? home}>
            {routes?.map((props, key) =>
                <Route key={key} {...props} back={handlerBack} jump={handlerJump} />
            )}
        </Switch>
    )
}