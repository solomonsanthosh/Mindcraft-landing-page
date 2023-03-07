import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css'],
})
export class DoctordashboardComponent implements OnInit {
  requests: any;
  user: any;
  date: any;
  time: any = '8:00 PM';
  constructor(private nav: NavService, private http: HttpClient) {}
  ngOnInit(): void {
    this.nav.hide();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getRequests();
  }
  getRequests() {
    this.http
      .get(
        `https://mindcraft-server.onrender.com/api/getrequest/${this.user._id}`
      )
      .subscribe((res) => {
        console.log(res);

        this.requests = res;
      });
  }
  meet(request: any) {
    const yy = new Date(this.date).getFullYear();
    const mm = new Date(this.date).getMonth();
    const dd = new Date(this.date).getDate();
    let times = this.time.split(' ')[0].split(':');
    if (this.time.split(' ')[1] == 'PM') times[0] = Number(times[0]) + 12;

    const completeDate = new Date(yy, mm, dd, times[0], times[1]);
    if (completeDate) {
      console.log(completeDate.toString());

      this.http
        .put('https://mindcraft-server.onrender.com/api/acceptrequest', {
          request_id: request._id,
          time: completeDate,
        })
        .subscribe((res: any) => {
          this.getRequests();
        });
    }
  }
}
