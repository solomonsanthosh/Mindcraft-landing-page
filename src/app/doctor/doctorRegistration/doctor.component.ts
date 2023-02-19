import { Component } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent {
  constructor(
    private nav: NavService,
    private toast: HotToastService,
    private route: Router,
    private http: HttpClient
  ) {
    this.nav.hide();
  }
  status: string;
  // file: File;
  // formDataFile: any;
  // onFileSelected(event: any) {
  //   this.file = event.target.files[0];
  // }
  submitform(form: any) {
    console.log(form);

    this.status = form.form.status;

    if (this.status != 'INVALID') {
      // let formData = new FormData();
      // formData.set('name', 'document');
      // formData.set('file', this.file);
      // // console.log(formDat);

      this.http
        .post('https://mindcraft-server.onrender.com/verifycoach', {
          name: form.form.value.name.trim(),
          email: form.form.value.email.trim(),
          about: form.form.value.about,
          experience: form.form.value.experience,
          phone: form.form.value.phone,
          fee: form.form.value.fee,
        })
        .subscribe((res) => {
          this.toast.success(
            'Request submitted successfully. Further information will be sent to your email',
            {
              duration: 5,
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
              },
              iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              },
            }
          );
          this.route.navigate(['/signup']);
        });
    } else {
      this.toast.error('pls', {
        duration: 5,
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
    }
  }
}
