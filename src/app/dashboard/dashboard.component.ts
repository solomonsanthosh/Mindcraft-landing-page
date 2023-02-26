import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  stories: any;
  constructor(private nav: NavService, private http: HttpClient) {}
  ngOnInit(): void {
    this.nav.show();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getSuccessStories();
  }
  getSuccessStories() {
    this.http
      .get(`https://mindcraft-server.onrender.com/getstory/${this.user.topic}`)
      .subscribe((res: any) => {
        this.stories = res;
        console.log(res);
      });
  }
}
