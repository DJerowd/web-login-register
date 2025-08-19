export function buildQuery(page, limit, username) {
    const params = new URLSearchParams()
    params.append('page', page)
    params.append('limit', limit)
    if (username) params.append('username', username)
    return `/users?${params.toString()}`
}