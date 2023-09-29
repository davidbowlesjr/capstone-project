export interface RegisterRequest {
    email : string,
    firstName : string,
    lastName : string,
    orgName : string,
    password : string
//   public passwordConfirm : string = "";
}

export interface RegisterResponse {
    user : User,
}
export interface User {
    id: number
    email: string,
    firstName: string,
    lastName: string,
    orgName: string
    //phoneNumber: number
     
}