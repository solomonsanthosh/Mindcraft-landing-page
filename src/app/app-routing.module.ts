import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CommentsComponent } from './post/comments/comments.component';
import { PostsComponent } from './post/posts/posts.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TestComponent } from './test/test.component';
import { DoctorComponent } from './doctor/doctorRegistration/doctor.component';
import { BooksessionComponent } from './doctor/booksession/booksession.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
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
  { path: 'doctor', component: DoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
