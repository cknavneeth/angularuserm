import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiUrl = `${environment.apiurl}`;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signupUser(user: any): Observable<{user: any, token: string}> {
    console.log('service call aayi')
    return this.http.post<{user: any, token: string}>(`${this.apiUrl}/signup`, user);
  }

  loginUser(user: {email: string, password: string}): Observable<{token: string, message: string}> {
    console.log('user service vilichitund')
    return this.http.post<{token: string, message: string}>(`${this.apiUrl}/login`, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
