import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };

  constructor(
    private authService: AuthService,
    private notify: SnotifyService) { }

  onSubmit() {
    this.notify.info('Wait...', {timeout: 5000})
    this.authService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res)
  {
    this.notify.success(res.data, {timeout: 0})
    this.form.email = null;

  }
  ngOnInit() {
  }

}
