import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
HttpClient;
@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css'],
})
export class PostcreateComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title: any;
  content: any;
  user: any;
  @Output()
  newpost: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  addPost() {
    this.http
      .post<any>('http://18.181.218.216:8080/api/createpost', {
        Post: {
          topic: this.user.topic,
          owner: this.user._id,
          title: this.title,
          content: this.content,
        },
      })
      .subscribe((res) => {
        console.log(res);
        this.newpost.emit(res);
        this.title = '';
        this.content = '';
      });
  }
}
