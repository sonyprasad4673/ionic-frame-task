import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from '../get-started/get-started.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { TipsComponent } from '../tips/tips.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {    path: 'home',component: HomePage},
  {    path:'get-started', component: GetStartedComponent  },
  {    path: 'tips',component: TipsComponent,  },
  {    path: 'login',component: LoginComponent,  },
  {    path: 'sign-up', component: SignUpComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
