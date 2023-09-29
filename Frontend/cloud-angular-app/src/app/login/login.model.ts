
export interface User {
    id: number
    email: string,
    firstName: string,
    lastName: string,
    orgname: string,
    isAdmin: boolean
    //phoneNumber: number
     
}
export interface LoginResponse {
    user : User,
}

export interface LoginRequest {
    email : string,
    password : string
}