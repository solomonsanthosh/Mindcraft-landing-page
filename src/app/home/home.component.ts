import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private nav: NavService) {}
  ngOnInit(): void {
    this.nav.show();
  }
}
