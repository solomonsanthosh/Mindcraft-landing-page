import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from 'src/services/post.service';
import Post from 'src/Interfaces/post.interface';
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
      .get(`http://18.181.218.216:8080/api/getpost/${this.user.topic}`)
      .subscribe((res: any) => {
        this.contents = res;
      });
  }
  // goComments(post: any) {
  //   this.postService.addCurrentPost(post);
  //   this.route.navigate(['/comments', post._id]);
  // }
  deletePost(post: Post) {
    this.http
      .delete(`http://18.181.218.216:8080/api/deletepost/${post._id}`)
      .subscribe((res: any) => {
        this.contents = this.contents.filter((con) => con._id !== post._id);
      });
  }
  getSuccessStories() {
    this.http
      .get(`http://18.181.218.216:8080/api/getstory/${this.user.topic}`)
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
        .get(`http://18.181.218.216:8080/api/getpost/${this.user.topic}`)
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
        .get(`http://18.181.218.216:8080/api/getpostuser/${this.user._id}`)
        .subscribe((res: any) => {
          this.contents = res;
          console.log(res);
        });
    }
  }
  addPost(res: any) {
    res.owner = this.user;
    this.contents.unshift(res);
  }
  addStory() {
    this.http
      .post<any>('http://18.181.218.216:8080/api/createstory', {
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
