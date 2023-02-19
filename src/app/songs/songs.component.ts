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
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getSongs();
  }

  constructor(private http: HttpClient) {}

  private getSongs() {
    this.http
      .get(`https://mindcraft-server.onrender.com/getmusic/${this.user.topic}`)
      .subscribe((res: any) => {
        console.log(res);

        this.songs = res;
      });
  }
}
