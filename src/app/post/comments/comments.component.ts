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
  currentPostId: any;
  currentPost: any;
  id: any;
  user: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.currentPostId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));

    this.http
      .get(`http://13.231.177.120/api/getpostsingle/${this.currentPostId}`)
      .subscribe((res: any) => {
        console.log(res, 'comment');

        this.currentPost = res;
      });
  }
  addComment() {
    if (this.comment) {
      this.http
        .post(`http://13.231.177.120/api/createcomment/`, {
          postid: this.currentPostId,
          content: {
            topic: this.user.topic,
            post: this.currentPostId,
            owner: this.user._id,
            content: this.comment,
          },
        })
        .subscribe((res: any) => {
          res.owner = this.user;

          this.currentPost.comments = [res, ...this.currentPost.comments];
        });
    } else {
      console.log('enter a comment');
    }
  }
}
