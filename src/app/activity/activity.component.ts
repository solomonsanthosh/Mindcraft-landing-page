import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  activities: any = [];
  user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getActivities();
  }

  constructor(private http: HttpClient) {}
  private getActivities() {
    this.http
      .get(`http://13.231.177.120/api/getactivity/${this.user.topic}`)
      .subscribe((res) => {
        this.activities = res;
      });
  }
}
