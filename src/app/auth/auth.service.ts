import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Article} from "../../models/article.model";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  PHP_API_SERVER = "http://127.0.0.1:8000";
  private user: User;

  constructor(private router: Router,
              private http: HttpClient) {}

  registerUser(authData: AuthData): Observable<User> {
    return this.http.post<User>(`${this.PHP_API_SERVER}/api/auth`, authData);
    this.user = {
      email: authData.email,
      password: authData.password,
      // userId: Math.round(Math.random() * 100000).toString()
    }
    this.authSuccessfully();
  }

  login(authData: AuthData): Observable<User> {
    return this.http.post<User>(`${this.PHP_API_SERVER}/api/auth`, authData);
    this.user = {
      email: authData.email,
      password: authData.password,
      // userId: Math.round(Math.random() * 100000).toString()
    }
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/articles']);
  }
}
