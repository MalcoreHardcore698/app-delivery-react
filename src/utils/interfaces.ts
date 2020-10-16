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