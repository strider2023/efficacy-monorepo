import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useCookies } from "react-cookie";
import { IAuthProvider } from '../interfaces';
import Cookies from 'js-cookie';

const defaultContext: IAuthProvider = {
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    user: undefined,
};

export const AuthContext = createContext({
    context: defaultContext,
    login: (request: unknown) => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "efficacy_authenticated",
        "efficacy_token",
        "efficacy_refresh_token",
        "efficacy_user"]);

    const [auth, setAuth] = useState<IAuthProvider>({
        isAuthenticated: cookies.efficacy_authenticated,
        token: cookies.efficacy_token,
        refreshToken: cookies.efficacy_refresh_token,
        user: cookies.efficacy_user,
    });

    if (auth.isAuthenticated && window.location.pathname == '/') {
        window.location.href = '/collections';
    }

    if (!auth.isAuthenticated && window.location.pathname != '/') {
        window.location.href = '/?redirect=' + window.location.pathname;
    }

    const login = async (request: unknown) => {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + '/api/auth/login', request);
        const decodedToken = jwtDecode(response.data.token);
        const expiry = new Date(parseInt(decodedToken.exp * 1000));
        setCookie("efficacy_authenticated", true, { expires: expiry });
        setCookie("efficacy_token", response.data.token, { expires: expiry });
        setCookie("efficacy_refresh_token", response.data.refreshToken, { expires: expiry });
        setCookie("efficacy_user", decodedToken, { expires: expiry });
        setAuth({
            isAuthenticated: true,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
            user: { ...decodedToken },
        });
        window.location.href = request.callbackURL || '/items';
    };

    const logout = async () => {
        try {
            const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
            await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, config);
        } catch (e) {
            console.error(e);
        }
        removeCookie("efficacy_authenticated");
        removeCookie("efficacy_token");
        removeCookie("efficacy_refresh_token");
        removeCookie("efficacy_user");
        setAuth({
            isAuthenticated: false,
            token: undefined,
            refreshToken: undefined,
            user: undefined,
        });
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ context: auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;