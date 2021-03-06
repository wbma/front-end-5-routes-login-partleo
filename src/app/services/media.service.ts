import {Injectable} from '@angular/core';
import {
  HttpClient, HttpClientModule, HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: String;
  password: String;
  status: String;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient, private  router: Router) {
  }

  public login() {
    console.log('username: ' + this.username);
    console.log('password: ' + this.password);

    const body = {
      username: this.username,
      password: this.password
    };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(res => {
      console.log(res['token']);
      localStorage.setItem('token', res['token']);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.status = error.error.message;
    });
  }

  register (user) {
    return this.http.post( this.apiUrl + '/users', user);
  }
  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }
}
