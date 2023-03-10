import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    console.log('ko');

    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getSongs();
  }
  @Output()
  musicSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  musicFiles: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {}
  onMusicSelect(event: any) {
    this.musicSelected.emit(event);
  }
  private getSongs() {
    this.http
      .get(`http://18.181.218.216:8080/api/getmusic/${this.user.topic}`)
      .subscribe((res: any) => {
        this.songs = res;
        this.musicFiles.emit(res);
      });
  }
}
