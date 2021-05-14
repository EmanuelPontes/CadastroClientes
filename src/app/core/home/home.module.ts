import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';


@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContentComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class HomeModule { }
