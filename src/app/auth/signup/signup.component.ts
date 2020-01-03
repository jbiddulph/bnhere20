import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;
  public form = {
    email: null,
    name: null,
    password: null,
    passwordconf: null
  }
  public error = [];
  constructor(
    private authserv: AuthService,
    private router: Router,
    private token: TokenService
    ) { }

  onSubmit() {
    this.authserv.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data)
  {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/articles');
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

}
