import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error = null;
  constructor(
    private authService: AuthService,
    private token: TokenService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data)
  {
    this.token.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/articles');
  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {
  }

}
