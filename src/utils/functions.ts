import { Order } from './interfaces'

const isDev: boolean = process.env.NODE_ENV === 'development'

export async function request(
    url: string,
    method: string = 'GET',
    body: string | null = null,
    headers: any = {}
) {
    try {
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, {
            method,
            body,
            headers,
            mode: 'no-cors',
            credentials: 'include'
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Wrong something')
        }

        return data
    } catch (e) {
        return e
    }
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}
  
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order: number = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

export function parseLink(str: string) {
    return str.toLowerCase().replace(' ', '-')
}

export function getPage(data: any, limit: number, page: number) {
    const start: number = (page * limit)
    const end: number = (start + limit)

    return data.slice(start, end)
}

export function getMaxPage(data: any, limit: number) {
    let arr: any = data
    let maxPage: number = 0
    while (arr.length > 0) {
        arr = arr.slice(limit)
        maxPage += 1
    }

    return (maxPage - 1)
}

export function getPath(navigator: Array<string>) {
    if (!navigator || navigator.length === 0)
        return null

    return navigator[navigator.length - 1]
}

export function setCookie(name: string, value: string, expiresDays=30) {
    const date: Date = new Date()
    date.setTime(date.getTime() + (expiresDays * 24*60*60*1000))
    const expires: string = "expires="+ date.toUTCString()
    const domain: string = (isDev) ? '' : 'domain=.aidreamer.com;'

    document.cookie = `${name}=${JSON.stringify(value)};${expires};${domain}path=/`
}

export function getCookie(cname: string) {
    const name: string = cname + "="
    const decodedCookie: string = decodeURIComponent(document.cookie)
    const ca: Array<string> = decodedCookie.split(';')

    for(var i = 0; i < ca.length; i++) {
        let c = ca[i]

        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

export function clearCookie(name: string) {
    const domain: string = (isDev) ? '' : 'domain=.aidreamer.com;'
    document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT; ${domain}`;
}

export function loadLocalStorage(name: string) {
    const str = localStorage.getItem(name)
    return (str) && JSON.parse(str)
}

export function saveLocalStorage(name: string, data: any) {
    const str = JSON.stringify(data)
    localStorage.setItem(name, str)
}