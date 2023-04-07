import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  mode: string = 'user';
  name: any;
  showNameInput: boolean = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  changeMode(mode: string) {
    this.mode = mode;
  }
  onSave() {
    this.http
      .put('http://52.194.239.150:8080/api/updateuser', {
        id: this.user._id,
        name: this.name,
      })
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.showNameInput = false;
      });
  }
}
