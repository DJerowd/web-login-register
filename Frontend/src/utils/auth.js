export function getLoggedInUser() {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
}

export function getToken() {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
}

export function clearAuthData() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
}
