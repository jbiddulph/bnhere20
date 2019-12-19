import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';

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
  constructor(private authService: AuthService,
              private http: HttpClient) { }

  onSubmit() {
    console.log(this.form);
    return this.http.post('http://localhost:8000/api/login', this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error),
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {
  }

}
