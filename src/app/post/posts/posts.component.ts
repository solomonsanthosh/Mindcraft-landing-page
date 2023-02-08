import { Component, OnInit } from '@angular/core';
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
  constructor(
    private http: HttpClient,
    private route: Router,
    private postService: PostService
  ) {}
  contents: any[] = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getPosts();
  }

  getPosts() {
    this.http
      .get(`https://mindcraft-server.onrender.com/getpost/${this.user.topic}`)
      .subscribe((res: any) => {
        this.contents.push(res);

        console.log(res);
      });
  }
  goComments(post: any) {
    this.postService.addCurrentPost(post);
    this.route.navigate(['/comments', post._id]);
  }
  addPost() {
    this.http
      .post<any>('http://localhost:8000/createpost', {
        Post: {
          topic: this.user.topic,
          owner: this.user._id,
          title: this.title,
          content: this.content,
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
