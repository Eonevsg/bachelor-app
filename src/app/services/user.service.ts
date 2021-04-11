import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user'
import { environment } from '../../environments/environment';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  public register(user: User) {
    return this.http.post<string>(
      `${this.url}/api/v1/registration`,
      user,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text' as 'json',
        observe: "response"
      });
  }

  public logIn(user: User) {
    return this.http
      .post(`${this.url}/login`, user, { observe: "response" })
      .pipe(
        tap((data) => {
          sessionStorage.setItem(
            "authorization",
            data.headers.get("Authorization")
          );
        })
      );
  }

  public getToken() {
    return sessionStorage.getItem("authorization");
  }

  public logOut() {
    sessionStorage.clear();
  }

}
