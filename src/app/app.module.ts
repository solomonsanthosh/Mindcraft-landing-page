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

// page components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongsComponent } from './songs/songs.component';
import { ActivityComponent } from './activity/activity.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/services/auth.service';
import { PostsComponent } from './post/posts/posts.component';
import { CommentsComponent } from './post/comments/comments.component';
import { NavComponent } from './post/nav/nav.component';
import { PostService } from 'src/services/post.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TestComponent } from './test/test.component';
import { NavService } from 'src/services/nav.service';

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
  ],
  imports: [
    BrowserModule,
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
