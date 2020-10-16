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

export function getPath(navigator: Array<string>) {
    if (!navigator || navigator.length === 0)
        return null

    return navigator[navigator.length - 1]
}