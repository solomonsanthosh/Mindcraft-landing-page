import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.css'],
})
export class MeetsComponent {
  user: any;
  requests: any;
  popup: boolean = false;
  currentMeet: any;
  constructor(private nav: NavService, private http: HttpClient) {}
  ngOnInit(): void {
    this.nav.hide();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getMeets();
  }
  getMeets() {
    this.http
      .get(`http://13.231.177.120/api/getmeets/${this.user._id}`)
      .subscribe((res: any) => {
        console.log(res);
        res.map((element: any) => {
          var d = new Date(element.meet_time);
          element.meet_time = d.toString();
        });
        this.requests = res;
      });
  }
  completeMeet() {
    this.http
      .put('http://13.231.177.120/api/completerequest', {
        request_id: this.currentMeet._id,
      })
      .subscribe((res) => {
        this.popup = false;
        this.getMeets();
      });
  }
}
