import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  public loggedIn: boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private Token: TokenService) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus
    // });
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
