import { Injectable } from "@angular/core";
import { RegisterRequest, RegisterResponse, User} from "./register.model";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn : 'root'
})
export class RegisterService {
    private apiUrl = environment.apiURL + '/register'

    private _isLoggedIn : boolean = false;
    private _currentUser!: User;

    constructor(private httpClient : HttpClient,private router: Router, private loginService: LoginService){

    }
    get IsLoggedIn() : boolean {
        return this._isLoggedIn;
    }

    get CurrentUser() : User {
        return this._currentUser;
    }

    headers = new HttpHeaders().set('content-type', 'application/json')

    register(email: any, firstName: any, lastName: any, orgName: any, password: any) {
        const registerRequest : RegisterRequest = {
            email : email,//<model>: <html bind>
            password : password,
            firstName: firstName,
            lastName: lastName,
            orgName: orgName
        }
        this.httpClient
            .post<RegisterResponse>(this.apiUrl, registerRequest)
            .subscribe(res => {
                this._isLoggedIn = true;
                this._currentUser = res.user;
                this.router.navigate(['/catalog'])
                this.loginService.login(registerRequest.email,registerRequest.password);
                //console.log("logged in name:" ,this.loginService.CurrentUser.firstName);
            })
    }

    logout() {
        this._isLoggedIn = false;
        
    }
}