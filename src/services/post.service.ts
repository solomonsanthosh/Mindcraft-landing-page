import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  post: any;
  getCurrentPost() {
    return this.post;
  }
  addCurrentPost(post: any) {
    this.post = post;
  }
}
