import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private nav: NavService) {}
  ngOnInit(): void {
    this.nav.show();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  
}
