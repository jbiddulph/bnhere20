import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";

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
    private authService: AuthService,
    private http: HttpClient) { }

  onSubmit(form: NgForm) {
    console.log(this.form);
    return this.http.post('http://localhost:8000/api/signup', this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error),
    );
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

}
