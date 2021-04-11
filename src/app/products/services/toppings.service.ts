import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Topping } from '../models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getToppings(): Observable<Topping[]> {

    

      return this.http
        .get<Topping[]>(`${this.url}/api/v1/toppings`)
        .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
  }
