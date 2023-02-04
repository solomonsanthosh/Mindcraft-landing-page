import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  status: string;
  submitform(form: any) {
    console.log(form);

    this.status = form.form.status;
  }
}
