import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token : string;
  public signin : boolean;

  constructor(private http : Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.signin = false;
  }

  login(username : string, password : string) : Observable < any > {

    return this
      .http
      .post('http://localhost:3000/auth/authenticate', {
        email: username,
        password: password
      })
      .map((response : Response) => {
        // if the login is failed then return the response as it is
        if (!response.json().success) {
          return response.json();
        }
        if (response.json().success) {
          let token = response.json() && response
            .json()
            .token;
          if (token) {
            // set token property
            this.token = token;
            // store username and jwt token in local storage to keep user logged in between
            // page refreshes
            localStorage.setItem('currentUser', JSON.stringify({email: username, token: token}));
            // return true to indicate successfull signin
            return response.json();
          } else {
            return response.json();
          }

        }
      })
      .catch((err : any) => {
        console.log(err);
        //else return false if a error occurs
        return Observable.of(false);
      });
  }

  signup(username : string, password : string) : Observable < any > {
    return this
      .http
      .post('http://localhost:3000/auth/register', {
        email: username,
        password: password
      })
      .map((response : Response) => {
        //return the response containing the success message from the database
        return response.json();
      })
      .catch((err : any) => {
        // return the response if a error exists  from the database
        return Observable.of({"success": 'false', "message": "Email Already Exist"})
      });
  }
  // check wether there is a user sign in or not if logged in then true will be
  // returned else false
  isAuthenticated() {
    if (this.getToken()) {
      return true
    } else 
      return false;
    }
  getToken() {

    return this.token
  }

  logout() : void {
    // turn the signin flag to false clear token remove user from local storage to
    // log user out
    this.signin = false;
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
