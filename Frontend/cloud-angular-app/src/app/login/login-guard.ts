
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable({
    providedIn: 'root'
})
export class LogInGuard implements CanActivate {
    constructor(private router: Router, private loginService : LoginService) {

    }
    /* check the conditions to decide whether the route can be activated */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // check if the user is logged in
        const loggedIn = this.loginService.IsLoggedIn;

        if (!loggedIn) {
            
            // redirect the user to the login route
            this.router.navigate(['/login'])
        }
        return loggedIn;
    }

}