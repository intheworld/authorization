
import {Component} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Router} from "@angular/router";
import { JwtHelper, AuthHttp} from "angular2-jwt"

const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})

export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && (new JwtHelper()).decodeToken(this.jwt);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:8080/');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:8080/users');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      const authHeader = new Headers();
      authHeader.append('Authorization', this.jwt);
      console.log(this.jwt);
      this.http.get(url, { headers: authHeader })
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}
