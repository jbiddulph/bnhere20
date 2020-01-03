import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  private loggedIn = new BehaviorSubject <boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(private http: HttpClient,
              private Token: TokenService) {}


  changeAuthStatus(value: boolean){
    this.loggedIn.next(value)
  }

  signup(data)
  {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data)
  {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
}
