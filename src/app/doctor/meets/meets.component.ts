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
  constructor(private nav: NavService, private http: HttpClient) {}
  ngOnInit(): void {
    this.nav.hide();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.http
      .get(`https://mindcraft-server.onrender.com/getmeets/${this.user._id}`)
      .subscribe((res: any) => {
        console.log(res);
        res.map((element: any) => {
          var d = new Date(element.meet_time);
          element.meet_time = d.toString();
        });
        this.requests = res;
      });
  }
}
