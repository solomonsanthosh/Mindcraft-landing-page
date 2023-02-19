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
import { DoctorComponent } from './doctor/doctorRegistration/doctor.component';
import { BooksessionComponent } from './doctor/booksession/booksession.component';
import { PostcreateComponent } from './post/postcreate/postcreate.component';
import { TopicComponent } from './topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SongsComponent,
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, PostService, NavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
