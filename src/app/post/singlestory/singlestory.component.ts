import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-singlestory',
  templateUrl: './singlestory.component.html',
  styleUrls: ['./singlestory.component.css'],
})
export class SinglestoryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  id: string;
  story: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('story')!;
    this.getStory();
  }
  getStory() {
    this.http
      .get(`http://18.181.218.216:8000/api/getsinglestory/${this.id}`)
      .subscribe((res: any) => {
        console.log(res);

        this.story = res;
      });
  }
}
