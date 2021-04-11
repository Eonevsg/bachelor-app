import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class LoginActivate implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['log-in'], { queryParams: { returnUrl: state.url } });
        }
        return true;
    }

    isLoggedIn(): boolean {
        return this.userService.getToken() ? true : false
    }
}