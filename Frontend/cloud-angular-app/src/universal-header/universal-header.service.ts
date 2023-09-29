import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversalHeaderService {

    private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    getLoggedInStatus(): BehaviorSubject<boolean> {
        return this.isLoggedIn
    }

    setLoggedInStatus(status: boolean) {
        this.isLoggedIn.next(status)
    }

}
