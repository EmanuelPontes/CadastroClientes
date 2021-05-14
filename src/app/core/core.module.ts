import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule, 
    LoginModule
  ],
  exports: [
    HomeModule, 
    LoginModule
  ]
})
export class CoreModule { }
