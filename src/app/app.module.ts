// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HotToastModule } from '@ngneat/hot-toast';
import { RatingModule } from 'ng-starrating';
import { AngMusicPlayerModule } from 'ang-music-player';
// page components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongsComponent } from './songs/songs.component';
import { ActivityComponent } from './activity/activity.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from 'src/services/auth.service';
import { PostsComponent } from './post/posts/posts.component';
import { CommentsComponent } from './post/comments/comments.component';
import { NavComponent } from './post/nav/nav.component';
import { PostService } from 'src/services/post.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TestComponent } from './test/test.component';
import { NavService } from 'src/services/nav.service';
import { DoctorComponent } from './doctor/user/doctorRegistration/doctor.component';
import { BooksessionComponent } from './doctor/user/booksession/booksession.component';
import { PostcreateComponent } from './post/postcreate/postcreate.component';
import { TopicComponent } from './topic/topic.component';
import { MeetComponent } from './doctor/user/meet/meet.component';
import { DoctordashboardComponent } from './doctor/doctordashboard/doctordashboard.component';
import { MeetRequestsComponent } from './profile/meetrequests/meetrequests.component';
import { MeetsComponent } from './doctor/meets/meets.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DoctormeetComponent } from './doctor/doctormeet/doctormeet.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SinglestoryComponent } from './post/singlestory/singlestory.component';
import { HomeComponent } from './home/home.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { DoctorDetailsComponent } from './doctor/user/doctor-details/doctor-details.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SongsComponent,
    MeetRequestsComponent,
    ActivityComponent,
    SignupComponent,
    LoginComponent,
    PostsComponent,
    CommentsComponent,
    NavComponent,
    NavbarComponent,
    TestComponent,
    DoctorComponent,
    BooksessionComponent,
    PostcreateComponent,
    TopicComponent,
    MeetComponent,
    DoctordashboardComponent,
    ProfileComponent,
    MeetsComponent,
    DoctormeetComponent,
    SinglestoryComponent,
    HomeComponent,
    DoctorDetailsComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    BrowserModule,
    HotToastModule.forRoot({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
    }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RatingModule,
    NgxStarRatingModule,
    AngMusicPlayerModule,
  ],
  providers: [AuthService, PostService, NavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
