import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  public error: [];
  public email: any;
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  changePassword() {
    this.AuthService.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data) {

    let _router = this.router;
    this.Notify.confirm('Done!, Now login with new password', {
      buttons:[
        {text: 'No',
          action: toaster => {
            _router.navigateByUrl('/login');
            this.Notify.remove(toaster.id)
          }
        },
      ]
    })

  }

  handleError(error) {
    this.error = error.error.errors
  }

  ngOnInit() {
  }

}
