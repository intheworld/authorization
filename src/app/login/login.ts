import { Component } from '@angular/core'
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";
import { contentHeaders } from '../common/headers';

const styles = require('./login.css');
const template = require('./login.html')

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: [ styles ]
})

export class Login {
  constructor(public router: Router, public http: Http) {

  }

  login(event, username: string, password: string): void {
    event.preventDefault();
    let body = JSON.stringify( { username, password });
    this.http.post('http://localhost:8080/login', body, { headers: contentHeaders})
      .subscribe(
        (response: Response) => {
          localStorage.setItem('id_token', response.headers.get("Authorization"));
          console.log(response.headers.get("Authorization"));
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event): void {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

}
