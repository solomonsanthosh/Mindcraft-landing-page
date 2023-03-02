import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CommentsComponent } from './post/comments/comments.component';
import { PostsComponent } from './post/posts/posts.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TestComponent } from './test/test.component';
import { DoctorComponent } from './doctor/user/doctorRegistration/doctor.component';
import { BooksessionComponent } from './doctor/user/booksession/booksession.component';
import { TopicComponent } from './topic/topic.component';
import { MeetComponent } from './doctor/user/meet/meet.component';
import { DoctordashboardComponent } from './doctor/doctordashboard/doctordashboard.component';
import { MeetRequestsComponent } from './profile/meetrequests/meetrequests.component';

import { MeetsComponent } from './doctor/meets/meets.component';
import { SinglestoryComponent } from './post/singlestory/singlestory.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meet/:link',
    component: MeetComponent,
  },
  {
    path: 'doctormeet/:link',
    component: MeetComponent,
  },
  {
    path: 'meets',
    component: MeetsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'doctordashboard',
    component: DoctordashboardComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: 'comments/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'topic', component: TopicComponent, canActivate: [AuthGuard] },
  {
    path: 'session',
    component: BooksessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'singlestory/:story',
    component: SinglestoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'doctor', component: DoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
