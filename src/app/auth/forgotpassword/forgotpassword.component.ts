import { Component } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  user: any;
  constructor(
    public auth: AngularFireAuth,
    private nav: NavService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.nav.hide();
  }
  status: any;
  submitform(form: any) {
    console.log(form);

    this.status = form.form.status;
    if (this.status != 'INVALID') {
      this.auth.sendPasswordResetEmail(form.form.value.email).then((res) => {
        this.toast.success('Password reset link has been sent to your email', {
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
      });
    } else {
      this.status = 'invalid';
    }
  }
}
