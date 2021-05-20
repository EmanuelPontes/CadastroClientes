import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { ModalConfirm } from '../shared/Modal/modal-confirm.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeModule, 
    LoginModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    HomeModule, 
    LoginModule
  ],
})
export class CoreModule { }
