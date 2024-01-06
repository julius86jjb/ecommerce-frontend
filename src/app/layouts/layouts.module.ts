import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { InstagramComponent } from './instagram/instagram.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    InstagramComponent,
    FooterComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    InstagramComponent,
    FooterComponent,
    SearchComponent,

  ]
})
export class LayoutsModule { }
