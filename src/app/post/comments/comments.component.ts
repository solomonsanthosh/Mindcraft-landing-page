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
  currentPost: any;
  id: any;
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
    console.log(this.currentPost);

    this.getComments(this.id);
  }
  getComments(id: string) {
    this.http
      .get(`https://mindcraft-server.onrender.com/getcomment/${id}`)
      .subscribe((res: any) => {
        this.contents.push(res);
      });
  }
}
