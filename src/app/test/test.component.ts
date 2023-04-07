import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  questions: any[] = [];
  values: any[] = [];
  depressionCount: any;
  anxietyCount: any;
  ptsdCount: any;
  topic: any;
  user: any;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http.get<any>('../../assets/questions.json').subscribe((res) => {
      this.questions = res.questions;
      this.user = JSON.parse(localStorage.getItem('user')!);
    });
    // .pipe(map((data: any) => console.log(data.result)));
  }

  onChange(e: any) {
    // if (this.values.find((value) => value.id === e.target.name)) {
    this.values.push({
      id: e.target.name,
      value: e.target.value,
    });
    this.values = this.values
      .reverse()
      .filter(
        (value, index, array) =>
          index === array.findIndex((findvalue) => findvalue.id === value.id)
      );
    // }
    // this.values.push({
    //   id: e.target.name,
    //   value: e.target.value,
    // });
    console.log(this.values);
  }
  submit() {
    if (this.values.length == 9) {
      this.depressionCount = this.values.filter((value) => {
        return value.value === 'depression';
      }).length;
      this.anxietyCount = this.values.filter((value) => {
        return value.value === 'anxiety';
      }).length;
      this.ptsdCount = this.values.filter((value) => {
        return value.value === 'ptsd';
      }).length;
      if (
        this.depressionCount > this.anxietyCount &&
        this.depressionCount > this.ptsdCount
      ) {
        this.topic = 'depression';
      } else if (
        this.anxietyCount > this.depressionCount &&
        this.anxietyCount > this.depressionCount
      ) {
        this.topic = 'anxiety';
      } else {
        this.topic = 'ptsd';
      }
      this.http
        .post<any>('http://52.194.239.150:8080/api/topic', {
          user: {
            topic: this.topic,
            email: this.user.email,
          },
        })
        .subscribe((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
