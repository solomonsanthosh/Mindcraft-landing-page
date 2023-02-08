import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  user: any;
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        // console.log(this.userData);
        // localStorage.setItem('user', this.userData);
        // console.log(localStorage.getItem('user'));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  SignUp(user: any) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // this.userData = result.user;
        // console.log('res');

        this.http
          .post('http://localhost:8000/createuser', user)
          .subscribe((data) => {
            this.userData = {
              _id: data,
              name: user.name,
              email: user.email,
            };
            localStorage.setItem('user', JSON.stringify(this.userData));
          });
        this.router.navigate(['test']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  SignIn(user: any) {
    return this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.http
          .get(`http://localhost:8000/getsingleuser/${user.email}`)
          .subscribe((res: any) => {
            if (res.topic) {
              this.router.navigate(['dashboard']);
              localStorage.setItem('user', JSON.stringify(res));
            } else {
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['test']);
            }
          });
        // console.log(result.user);

        //
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.userData = result.user;
        console.log(result.user);
        this.router.navigate(['dashboard']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user') || '{}';
    console.log(user);

    return user !== null ? true : false;
  }
}
