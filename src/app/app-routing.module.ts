import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {ArticlesComponent} from './admin/articles/articles.component';
// import {AuthGuard} from './auth/auth.guard';
import {RequestResetComponent} from './auth/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './auth/password/response-reset/response-reset.component';
import {BeforeLoginService} from "./services/before-login.service";
import {AfterLoginService} from "./services/after-login.service";

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [BeforeLoginService] },
  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService] },
  { path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AfterLoginService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
