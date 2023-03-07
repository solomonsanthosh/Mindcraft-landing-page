import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
declare var Stripe: any;
@Component({
  selector: 'app-meetrequest',
  templateUrl: './meetrequests.component.html',
  styleUrls: ['./meetrequests.component.css'],
})
export class MeetRequestsComponent implements OnInit {
  stripe: any;
  cardElement: any;
  user: any;
  requests: any;

  currentDate: Date;
  currentRequest: any;
  ratingPopup: Boolean = false;
  rating: Number = 0;
  ratingDescription: string;

  @ViewChild('cardElement') cardElem!: ElementRef;
  constructor(
    private http: HttpClient,
    private route: Router,
    private toast: HotToastService
  ) {}
  ngAfterViewInit() {
    this.payment();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.currentDate = new Date();
    this.currentRequest = {
      doctor: {
        fee: 0,
      },
    };

    this.getUserRequest();
  }
  getUserRequest() {
    this.http
      .get(`http://18.181.218.216:8000/api/getuserrequest/${this.user._id}`)
      .subscribe((res: any) => {
        console.log(res);
        res.map((element: any) => {
          var d = new Date(element.meet_time);
          element.meet_time = d.toString();
          element.time = d;
        });
        this.requests = res;
      });
  }
  payment() {
    this.stripe = Stripe(
      'pk_test_51MeM5WSHr5tIqdHu9T4wdwuJfM46TqQWmAqqdl7BKnabmUr4uBpkHeA3b2P2XsH44PBAZNdcblM14h97RmromlB200JTdWB4FY'
    );
    var elements = this.stripe.elements();
    var style = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: 'Helvetica Neue',
        fontSize: '15px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    };
    this.cardElement = elements.create('card', { style: style });
    this.cardElement.mount('#card-element');
  }
  sendPayment() {
    this.http
      .post('http://18.181.218.216:8000/api/payment', {
        name: this.user.name,
        amt: this.currentRequest.doctor.fee,
      })
      .subscribe(async (res: any) => {
        await this.stripe
          .confirmCardPayment(res.clientSecret, {
            payment_method: { card: this.cardElement },
          })
          .then((result: any) => {
            if (result.error) {
              // Display error.message in your UI.
              console.log(result.error, ' ==== error');
            } else {
              console.log('success ==== ', result);
              this.cardElem.nativeElement.style.display = 'none';
              this.http
                .put(
                  `http://18.181.218.216:8000/api/makepayment/${this.currentRequest._id}`,
                  {
                    currentRequest: this.currentRequest,
                  }
                )
                .subscribe((res: any) => {
                  this.getUserRequest();

                  this.toast.success('Payment successfully', {
                    style: {
                      border: '1px solid #44B159',
                      padding: '16px',
                      color: '#44B159',
                    },
                    iconTheme: {
                      primary: '#44B159',
                      secondary: '#FFFAEE',
                    },
                  });
                });
            }
          });
      });
  }

  checkPay(request: any) {
    if (request.paid) {
      this.route.navigate([`/meet/${request.link}`]);
    } else {
      this.currentRequest = request;

      this.cardElem.nativeElement.style.display = 'flex';
    }
  }
  createReview() {
    console.log(this.currentRequest);

    this.http
      .post('http://18.181.218.216:8000/api/review', {
        user_id: this.currentRequest.user,
        doctor_id: this.currentRequest.doctor._id,
        rating: this.rating,
        description: this.ratingDescription,
      })
      .subscribe((res) => {
        console.log(res);
        this.ratingPopup = false;
        this.rating = 0;
        this.ratingDescription = '';
        this.toast.success('Review added successfully', {
          style: {
            border: '1px solid #44B159',
            padding: '16px',
            color: '#44B159',
          },
          iconTheme: {
            primary: '#44B159',
            secondary: '#FFFAEE',
          },
        });
      });
  }
}
