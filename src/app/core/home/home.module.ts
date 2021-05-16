import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null

@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class HomeModule { }
