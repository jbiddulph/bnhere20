import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

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
  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.form).subscribe(
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
