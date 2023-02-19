import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from 'src/services/post.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  user: any;
  title: any;
  content: any;
  stories: any;
  showStories = false;
  showCreate = true;
  story: any;
  mode: string;
  constructor(
    private http: HttpClient,
    private route: Router,
    private postService: PostService
  ) {}
  contents: any[] = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getPosts();
    this.getSuccessStories();
  }

  getPosts() {
    this.http
      .get(`https://mindcraft-server.onrender.com/getpost/${this.user.topic}`)
      .subscribe((res: any) => {
        this.contents = res;
      });
  }
  // goComments(post: any) {
  //   this.postService.addCurrentPost(post);
  //   this.route.navigate(['/comments', post._id]);
  // }
  getSuccessStories() {
    this.http
      .get(`https://mindcraft-server.onrender.com/getstory/${this.user.topic}`)
      .subscribe((res: any) => {
        this.stories = res;
        console.log(res);
      });
  }
  getTopicChange(data: string) {
    this.mode = data;
    if (data == 'explore') {
      this.showCreate = true;
      this.showStories = false;
      this.http
        .get(`https://mindcraft-server.onrender.com/getpost/${this.user.topic}`)
        .subscribe((res: any) => {
          this.contents = res;
        });
    } else if (data == 'story') {
      this.showCreate = false;
      this.showStories = true;
    } else {
      this.showStories = false;
      this.showCreate = false;
      this.http
        .get(
          `https://mindcraft-server.onrender.com/getpostuser/${this.user._id}`
        )
        .subscribe((res: any) => {
          this.contents = res;
        });
    }
  }
  addPost(res: any) {
    console.log(res);
    res.owner = this.user;
    this.contents.unshift(res);
  }
  addStory() {
    this.http
      .post<any>('https://mindcraft-server.onrender.com/createstory', {
        topic: this.user.topic,
        owner: this.user._id,
        story: this.story,
      })
      .subscribe((res) => {
        res.owner = { name: this.user.name };

        this.stories = [res, ...this.stories];
        console.log(this.stories);
      });
  }
}
