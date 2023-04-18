import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-booksession',
  templateUrl: './booksession.component.html',
  styleUrls: ['./booksession.component.css'],
})
export class BooksessionComponent implements OnInit {
  doctors: any = [];
  razorpay: any;
  user: any;
  totalRating: Number = 0;
  currentDoctor: any;
  popup: boolean = false;
  options: {};

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getDoctors();
  }
  getDoctors() {
    this.http
      .get<any>('http://35.78.205.53:8080/api/getcoach')
      .subscribe((res) => {
        console.log(res);

        this.doctors = res;
      });
  }

  // pay(fee: any) {
  //   this.http
  //     .post<any>('http://35.78.205.53:8080/api/payment', {
  //       fee: fee,
  //     })
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // var options = {
  //   key: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
  //   amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //   currency: 'INR',
  //   name: 'Mindcraft', //your business name
  //   description: 'Test Transaction',
  //   image: 'https://example.com/your_logo',
  //   order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //   callback_url: 'http://localhost:4200/doctor',
  //   prefill: {
  //     name: 'Gaurav Kumar', //your customer's name
  //     email: 'gaurav.kumar@example.com',
  //     contact: '9000090000',
  //   },
  //   notes: {
  //     address: 'Razorpay Corporate Office',
  //   },
  //   theme: {
  //     color: '#3399cc',
  //   },
  // };
  // var rzp1 = this.auth.nativeWindow.Razorpay(options);
  // rzp1.open();
  // }
  session() {
    this.http
      .post('http://35.78.205.53:8080/api/createrequest', {
        user: this.user._id,
        doctor: this.currentDoctor._id,
      })
      .subscribe((res) => {
        this.popup = false;
        this.toast.success(
          'Request sent successfully.Please check profile for request status',
          {
            style: {
              border: '1px solid #44B159',
              padding: '16px',
              color: '#44B159',
            },
            iconTheme: {
              primary: '#44B159',
              secondary: '#FFFAEE',
            },
          }
        );
      });
  }
}
