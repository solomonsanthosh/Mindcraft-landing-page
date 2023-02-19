import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from 'src/services/auth.service';
import { NavService } from 'src/services/nav.service';
// import { GoogleAuthProvider } from 'firebase/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private nav: NavService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.nav.hide();
  }
  status: string;
  user: any;
  submitform(form: any) {
    console.log(form);

    this.status = form.form.status;
    if (this.status != 'INVALID') {
      this.user = {
        name: form.form.value.name.trim(),
        email: form.form.value.email,
        password: form.form.value.password,
      };
      this.auth.SignUp(this.user);
    } else {
      this.status = 'invalid';
    }
  }
  openPopup() {
    this.auth.GoogleAuth('signup');
  }
}
