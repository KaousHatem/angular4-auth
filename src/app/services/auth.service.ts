import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { User } from '../models/user';




@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:5000/auth';
  private headers: HttpHeaders = new HttpHeaders({'content-type':'application/json'});
  // private httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private http: HttpClient){
    
  }

  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers:this.headers}).toPromise();

  }

  register(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers:this.headers}).toPromise();

  }

  logout(token): Promise<any> {
    let url: string = `${this.BASE_URL}/logout`;
    let headers2: HttpHeaders = new HttpHeaders({
      'Content-type':'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url,'',{headers:headers2}).toPromise(); 
  }

  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/status`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-type':'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers:headers}).toPromise(); 
  }
  
}
