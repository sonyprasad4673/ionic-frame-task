import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TipsComponent } from './tips/tips.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  {     path:'',  component: SignUpComponent},
  {    path: 'home', component: HomePage},
  {    path: 'get-started', component: GetStartedComponent,  },
  {    path: 'tips',    component: TipsComponent,  },
  {    path: 'login',    component: LoginComponent,  },
  {    path: 'sign-up',    component: SignUpComponent,  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
