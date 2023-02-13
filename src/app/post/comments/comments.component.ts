import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/services/post.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  contents: any[] = [];
  comment: any;
  currentPost: any;

  id: any;
  user: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      //change the value of showRoutes based on your requirements
      this.id = params.params.id;
    });
  }

  ngOnInit() {
    this.currentPost = this.postService.getCurrentPost();
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.currentPost);

    this.getComments(this.id);
  }
  addComment() {
    if (this.comment) {
      this.http
        .post(`http://localhost:8000/createcomment/`, {
          postid: this.currentPost._id,
          content: {
            topic: this.user.topic,
            post: this.currentPost._id,
            owner: this.user._id,
            content: this.comment,
          },
        })
        .subscribe((res: any) => {
          res.owner = { name: this.user.name };
          this.contents[0] = [res, ...this.contents[0]];
          console.log(this.contents);
        });
    } else {
      console.log('enter a comment');
    }
  }
  getComments(id: string) {
    this.http
      .get(`https://mindcraft-server.onrender.com/getcomment/${id}`)
      .subscribe((res: any) => {
        this.contents.push(res);
      });
  }
}
