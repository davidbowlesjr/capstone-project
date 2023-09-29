/*API for server communication */
import { Injectable } from "@angular/core";
import { LoginRequest, LoginResponse, User } from "./login.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UniversalHeaderService } from "src/universal-header/universal-header.service";
import { environment } from '../../environments/environment'
@Injectable({
    providedIn : 'root'
})
export class LoginService {
    private apiUrl = environment.apiURL + '/login'
    private _isAdmin: boolean = false;
    private _isLoggedIn : boolean = false;
    private _currentUser!: User;

    constructor(private httpClient : HttpClient,
                private router: Router,
                private headerService: UniversalHeaderService){

    }
    get IsLoggedIn() : boolean {
        return this._isLoggedIn;
    }

    get CurrentUser() : User {
        return this._currentUser;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }


    login(emailId: any, password: any) {
        const loginRequest : LoginRequest = {
            email : emailId,
            password : password
        }
        this.httpClient
            .post<LoginResponse>(this.apiUrl, loginRequest)
            .subscribe((res) => {
                // this._isLoggedIn = true;
                this._currentUser = res.user;
                this._isAdmin = res.user.isAdmin;
                //this.headerService.setLoggedInStatus(this._isLoggedIn)
                if(this._currentUser){
                    this.router.navigate(['/catalog'])
                    this._isLoggedIn = true;
                    this.headerService.setLoggedInStatus(this._isLoggedIn)
                }
                else{
                    console.log("incorrect login credentials");
                    alert("Incorrect login credentials");
                }
            },
            // (error) => {
            //     console.log("incorrect login credentials");
            //     alert("Incorrect login credentials");

            // }
            );
    }

    logout() {
        this._isLoggedIn = false;
        
    }
}