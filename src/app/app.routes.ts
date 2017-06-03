import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '', component: Login},
  { path: 'login', component: Login},
  { path: 'signup', component: Signup},
  { path: 'home', component: Home, canActivate: [AuthGuard]},
  { path: '**', component: Login},
];



