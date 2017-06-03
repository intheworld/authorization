// Import dependencies
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './common/auth.guard';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AppComponent } from './app.component';

import { routes } from './app.routes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

// Declare the NgModule decorator
@NgModule({
  // Define the root component
  bootstrap: [AppComponent],
  // Define other components in our module
declarations: [
    Home, Login, Signup, AppComponent
  ],
  // Define the services imported by our app
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }), NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
})
export class AppModule {}
