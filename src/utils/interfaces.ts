export interface RouteProps {
    exact?: boolean,
    path?: string,
    component: any
}

export interface AuthProps {
    login?: void,
    logout?: void,
    sessionID: string | null,
    isAuthenticated: boolean
}

export interface SelectProps {
    disabled: boolean,
    group: string,
    selected: boolean,
    text: string,
    value: string
}