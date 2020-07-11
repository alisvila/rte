import JwtDecode from 'jwt-decode';
import { sendRefreshToken } from './services'


export const logout = () => {
    localStorage.removeItem('token')
    return
}

// @remove
export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    console.log(!!token)

    return !!token ? true : false
}

export const  is_authenticated = () => {

    const token = localStorage.getItem('access_token');

    //if token is not expired send on the way
    if (token && JwtDecode(token).exp > Date.now() / 1000) {
        return true;
    }
    else {

        // if token is expired try to refresh
        const refresh_token = localStorage.getItem('refresh_token');
        console.log(refresh_token, JwtDecode(refresh_token).exp > Date.now() / 1000)
        if (refresh_token && JwtDecode(refresh_token).exp > Date.now() / 1000) {
            sendRefreshToken().then(data => {
                console.log(data)
                return true
            }).catch(e => false)
        }
        else {
            console.log('in here')
            return false
        }
    }
    // return false
}