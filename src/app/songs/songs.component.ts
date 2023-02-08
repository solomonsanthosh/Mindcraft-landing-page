import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  user: any;
  ngOnInit() {
    this.getSongs();
    this.user = localStorage.getItem('user');
  }

  constructor(private http: HttpClient) {}

  private getSongs() {
    this.http
      .get('https://mindcraft-server.onrender.com/getmusic/stress')
      .subscribe((res) => {
        this.songs.push(res);
        console.log(res);
      });
  }
}
