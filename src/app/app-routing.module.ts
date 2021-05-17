import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    loadChildren: () => import('./core/login/login.module').then(moduleObj => moduleObj.LoginModule)
    
  },

  {
    path:'home',
    loadChildren: () => import('./core/home/home.module').then(moduleObj => moduleObj.HomeModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
