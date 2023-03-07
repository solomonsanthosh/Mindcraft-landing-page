import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit {
  id: any;
  doctor: any;
  user: any;
  currentDoctor: any;
  popup: boolean = false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.id = this.route.snapshot.paramMap.get('id');
    this.http
      .get(`https://mindcraft-server.onrender.com/api/doctor/${this.id}`)
      .subscribe((res) => {
        this.doctor = res;
      });
  }
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}
  session() {
    this.http
      .post('https://mindcraft-server.onrender.com/api/createrequest', {
        user: this.user._id,
        doctor: this.currentDoctor._id,
      })
      .subscribe((res) => {
        this.popup = false;
        this.toast.success(
          'Request sent successfully.Please check profile for request status',
          {
            style: {
              border: '1px solid #44B159',
              padding: '16px',
              color: '#44B159',
            },
            iconTheme: {
              primary: '#44B159',
              secondary: '#FFFAEE',
            },
          }
        );
      });
  }
}
