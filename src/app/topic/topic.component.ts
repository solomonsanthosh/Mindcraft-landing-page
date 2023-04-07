import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/services/nav.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  selected: any = null;
  user: any;
  topicIndex: number = 0;
  topics = [
    {
      topic: 'stress',
      question1: 'Do you feel Overwhelmed ?',
      question2: 'Do you feel Lonely or Isolated ?',
      question3: 'Do you feel Tired ?',
      question4: 'Do you feel Discouraged ?',
      question5: 'Do you feel loaded down with responsibility ?',
    },
    {
      topic: 'depression',
      question1: 'Feeling down, depressed, or hopeless ?',
      question2: 'Trouble falling or staying asleep, or sleeping too much ?',
      question3: 'Feeling tired or having little energy ?',
      question4: 'Trouble concentrating on things ?',
      question5:
        'Moving or speaking so slowly that other people could have noticed ?',
    },
    {
      topic: 'anxiety',
      question1: 'Feeling nervous, anxious, or on edge ?',
      question2: 'Not being able to stop or control worrying ?',
      question3: 'Worrying too much about different things ?',
      question4: 'Feeling afraid, as if something awful might happen ?',
      question5: 'Becoming easily annoyed or irritable ?',
    },
    {
      topic: 'ptsd',
      question1:
        'had nightmares about the events or thought about the events when you did not want to ?',
      question2: 'been constantly on guard, watchful, or easily startled ?',
      question3:
        'felt numb or detached from people, activities, or your surroundings ?',
      question4:
        'felt guilty or unable to stop blaming yourself or others for the events or any problems the events may have caused ?',
      question5:
        'tried hard not to think about the events or went out of your way to avoid situations that reminded you of the events ?',
    },
  ];

  constructor(
    private nav: NavService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.nav.hide();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  onTopicSelect = (data: any) => {
    this.selected = data;
  };
  changeTopic() {
    if (this.topicIndex == 3) {
      this.topicIndex = 0;
      this.save();
    } else {
      this.topicIndex = this.topicIndex + 1;
    }
  }
  save() {
    this.http
      .post<any>('http://52.194.239.150:8080/api/topic', {
        user: {
          topic: this.topics[this.topicIndex].topic,
          email: this.user.email,
        },
      })
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      });
  }
}
