export type Order = 'asc' | 'desc'

export interface Post {
    _id: string,
    trackId: string,
    companyName: string,
    carrierName: string,
    carrierPhone: string,
    comments: string,
    code: string
}

export interface Posts {
    posts: Post[]
}

export interface HeadCell {
    disablePadding: boolean,
    id: keyof Post,
    label: string,
    numeric: boolean
}

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