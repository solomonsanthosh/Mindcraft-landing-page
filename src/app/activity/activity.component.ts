import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: any[] = [];
  ngOnInit() {
    this.getActivities()
    
  }

  constructor(private http: HttpClient){

  }
  private getActivities( ) {
       this.http.get('https://mindcraft-server.onrender.com/getactivity/stress').subscribe((res)=>{
          this.activities.push(res);
          console.log(res);
          
          
          
          
      })
  }
}
