import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  user: any;
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private toast: HotToastService,
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
  get nativeWindow(): any {
    return _window();
  }
  SignUp(user: any) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // this.userData = result.user;
        // console.log('res');
        this.toast.success('Signup successful', {
          style: {
            border: '1px solid #44B159',
            padding: '16px',
            color: '#44B159',
          },
          iconTheme: {
            primary: '#44B159',
            secondary: '#FFFAEE',
          },
        });
        this.http
          .post('https://mindcraft-server.onrender.com/api/createuser', user)
          .subscribe((data: any) => {
            console.log(data);

            this.userData = {
              _id: data._id,
              name: user.name,
              email: user.email,
            };
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.router.navigate(['topic']);
          });
      })
      .catch((error) => {
        this.toast.error(error.code, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      });
  }
  SignIn(user: any) {
    return this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.http
          .get(
            `https://mindcraft-server.onrender.com/api/getsingleuser/${user.email}`
          )
          .subscribe((res: any) => {
            this.toast.success('Login successful', {
              style: {
                border: '1px solid #44B159',
                padding: '16px',
                color: '#44B159',
              },
              iconTheme: {
                primary: '#44B159',
                secondary: '#FFFAEE',
              },
            });
            console.log(res);

            if (res?.topic) {
              this.router.navigate(['dashboard']);
              localStorage.setItem('user', JSON.stringify(res));
            } else {
              if (res?.role == 'doctor') {
                localStorage.setItem('user', JSON.stringify(res));
                this.router.navigate(['doctordashboard']);
              } else {
                localStorage.setItem('user', JSON.stringify(res));
                this.router.navigate(['topic']);
              }
            }
          });
        // console.log(result.user);

        //
      })
      .catch((error) => {
        this.toast.error(error.code, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      });
  }
  GoogleAuth(mode: String) {
    if (mode == 'signup') {
      return this.AuthSignup(new GoogleAuthProvider());
    } else {
      return this.AuthLogin(new GoogleAuthProvider());
    }
  }
  // Auth logic to run auth providers
  AuthSignup(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.http
          .post('https://mindcraft-server.onrender.com/api/createuser', {
            email: result.user.email,
            name: result.user.displayName,
          })
          .subscribe((data: any) => {
            if (data.error === 'already_exists') {
              this.toast.error('User already exists', {
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
                iconTheme: {
                  primary: '#713200',
                  secondary: '#FFFAEE',
                },
              });
            } else {
              this.toast.success('Signup successful', {
                style: {
                  border: '1px solid #44B159',
                  padding: '16px',
                  color: '#44B159',
                },
                iconTheme: {
                  primary: '#44B159',
                  secondary: '#FFFAEE',
                },
              });
              this.userData = {
                _id: data._id,
                name: data.name,
                email: data.email,
              };
              localStorage.setItem('user', JSON.stringify(this.userData));
              this.router.navigate(['topic']);
            }
          });
      })
      .catch((error) => {
        this.toast.error(error.code, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      });
  }
  AuthLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.toast.success('Login successful', {
          style: {
            border: '1px solid #44B159',
            padding: '16px',
            color: '#44B159',
          },
          iconTheme: {
            primary: '#44B159',
            secondary: '#FFFAEE',
          },
        });
        this.http
          .get(
            `https://mindcraft-server.onrender.com/api/getsingleuser/${result.user.email}`
          )
          .subscribe((res: any) => {
            console.log(res, 'res');

            if (res == null) {
              this.http
                .post('https://mindcraft-server.onrender.com/api/createuser', {
                  email: result.user.email,
                  name: result.user.displayName,
                })
                .subscribe((data: any) => {
                  console.log(data);

                  this.userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                  };
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  this.router.navigate(['topic']);
                });
            } else {
              if (res.topic) {
                localStorage.setItem('user', JSON.stringify(res));

                this.router.navigate(['dashboard']);
              } else {
                localStorage.setItem('user', JSON.stringify(res));

                this.router.navigate(['topic']);
              }
            }
          });
        // console.log(result.user);

        //
      })

      .catch((error) => {
        this.toast.error(error.code, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user, 'lll');

    return user !== null && user.role !== 'doctor' ? true : false;
  }
  logout() {
    localStorage.setItem('user', null!);
    this.userData = null;
    this.router.navigate(['/signin']);
  }
}
