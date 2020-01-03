import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from './services/auth.service';
import {ArticlesService} from './admin/articles/articles.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UpdateArticleDialogComponent } from './admin/articles/update-article-dialog/update-article-dialog.component';
import { RequestResetComponent } from './auth/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './auth/password/response-reset/response-reset.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {BeforeLoginService} from "./services/before-login.service";
import {AfterLoginService} from "./services/after-login.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ArticlesComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    UpdateArticleDialogComponent,
    RequestResetComponent,
    ResponseResetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SnotifyModule
  ],
  entryComponents: [UpdateArticleDialogComponent],
  providers: [AuthService, ArticlesService, HttpClient, BeforeLoginService, AfterLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
