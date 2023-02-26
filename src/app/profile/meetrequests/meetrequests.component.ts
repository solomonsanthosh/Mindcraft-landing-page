import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-meetrequest',
  templateUrl: './meetrequests.component.html',
  styleUrls: ['./meetrequests.component.css'],
})
export class MeetRequestsComponent implements OnInit {
  user: any;
  requests: any;
  paymentHandler: any = null;

  constructor(
    private http: HttpClient,
    private route: Router,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.invokeStripe();
    this.http
      .get(
        `https://mindcraft-server.onrender.com/getuserrequest/${this.user._id}`
      )
      .subscribe((res: any) => {
        console.log(res);
        res.map((element: any) => {
          var d = new Date(element.meet_time);
          element.meet_time = d.toString();
        });
        this.requests = res;
      });
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MeM5WSHr5tIqdHu9T4wdwuJfM46TqQWmAqqdl7BKnabmUr4uBpkHeA3b2P2XsH44PBAZNdcblM14h97RmromlB200JTdWB4FY',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        this.toast.success('Payment Successful', {
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

        // alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Mindcraft',
      // description: '3 widgets',
      amount: amount * 100,
      currency: 'INR',
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MeM5WSHr5tIqdHu9T4wdwuJfM46TqQWmAqqdl7BKnabmUr4uBpkHeA3b2P2XsH44PBAZNdcblM14h97RmromlB200JTdWB4FY',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  checkPay(request: any) {
    if (request.paid) {
      this.route.navigate([`/meet/${request.link}`]);
    } else {
      this.makePayment(request.doctor.fee);
      this.http
        .put(
          `https://mindcraft-server.onrender.com/makepayment/${request._id}`,
          {
            paid: true,
          }
        )
        .subscribe((res: any) => {
          this.requests.map((request: any, index: any) => {
            if (request._id == res._id) {
              this.requests[index] = res;
            }
          });
        });
    }
  }
}
