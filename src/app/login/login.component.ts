import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from 'src/services/auth.service';
import { NavService } from 'src/services/nav.service';
// import { GoogleAuthProvider } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService, private nav: NavService) {}
  ngOnInit(): void {
    this.nav.hide();
  }
  status: string;
  submitform(form: any) {
    console.log(form);

    this.status = form.form.status;
    if (this.status != 'INVALID') {
      this.user = {
        email: form.form.value.email,
        password: form.form.value.password,
      };
      this.auth.SignIn(this.user);
    }
  }
  openPopup() {
    this.auth.GoogleAuth();
  }
}
