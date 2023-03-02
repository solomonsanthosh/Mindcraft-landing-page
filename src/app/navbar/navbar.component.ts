import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}
  user: any;
  @ViewChild('mobileNav') mobileNav: ElementRef;

  logout() {
    this.auth.logout();
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.user, 'll');
  }
  enableNav() {
    this.mobileNav.nativeElement.classList.toggle('navToggle');
  }
}
