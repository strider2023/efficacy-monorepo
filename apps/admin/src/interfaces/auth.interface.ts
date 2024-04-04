export interface IAuthToken {
    firstname: string
    middlename?: string
    lastname: string
    email: string
    image?: string
    role: string
    iat: Date
    exp: Date
    iss: string
}

export interface IAuthProvider {
    isAuthenticated: boolean
    token?: string
    refreshToken?: string
    user?: IAuthToken
}