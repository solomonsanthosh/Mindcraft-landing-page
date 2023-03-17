import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  stories: any;
  showMusic: Boolean = false;
  audioList: any = [];
  constructor(
    private nav: NavService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.nav.show();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getSuccessStories();
  }
  getSuccessStories() {
    this.http
      .get(`http://18.181.218.216:8080/api/getstory/${this.user.topic}`)
      .subscribe((res: any) => {
        this.stories = res;
        console.log(res);
      });
  }

  musicSelect(event: any) {
    console.log(event);
    event = event.split(' ').join('').toLowerCase();
    event = event.charAt(0).toUpperCase() + event.slice(1);
    this.showMusic = true;
    this.audioList = this.audioList.filter(
      (audio: any) =>
        audio.url !== `http://18.181.218.216:8080/api/getmusicfile/${event}`
    );
    this.audioList.unshift({
      url: `http://18.181.218.216:8080/api/getmusicfile/${event}`,
      title: event,
    });
  }
  musicFiles(event: any) {
    console.log(event);

    event.map((music: any) => {
      console.log(music, 'music');
      music.song = music.song.split(' ').join('').toLowerCase();
      music.song = music.song.charAt(0).toUpperCase() + music.song.slice(1);
      this.audioList.push({
        url: `http://18.181.218.216:8080/api/getmusicfile/${music.song}`,
        title: music.song,
      });
    });
  }
}
