import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  selected: any = null;
  user: any;
  constructor(
    private nav: NavService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.nav.hide();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  onTopicSelect = (data: any) => {
    this.selected = data;
  };
  save() {
    this.http
      .post<any>('https://mindcraft-server.onrender.com/api/topic', {
        user: {
          topic: this.selected,
          email: this.user.email,
        },
      })
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      });
  }
}
