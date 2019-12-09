import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ArticlesComponent } from './backend/articles/articles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from "./auth/auth.service";
import {ArticlesService} from "./backend/articles/articles.service";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UpdateArticleDialogComponent } from './backend/articles/update-article-dialog/update-article-dialog.component';


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
  ],
  entryComponents: [UpdateArticleDialogComponent],
  providers: [AuthService, ArticlesService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
