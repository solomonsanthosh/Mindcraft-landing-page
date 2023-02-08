import { Component } from '@angular/core';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public nav: NavService) {}

  title = 'mindcraft';
}
