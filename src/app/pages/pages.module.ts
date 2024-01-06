import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { SidebarShopComponent } from './shop/components/sidebar-shop/sidebar-shop.component';
import { MainShopComponent } from './shop/components/main-shop/main-shop.component';
import { CategoriesComponent } from './shop/components/sidebar-shop/components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterByPriceComponent } from './shop/components/sidebar-shop/components/filter-by-price/filter-by-price.component';
import { FilterByRateComponent } from './shop/components/sidebar-shop/components/filter-by-rate/filter-by-rate.component';
import { ProductItemComponent } from './shop/components/main-shop/components/product-item/product-item.component';
import { SortByComponent } from './shop/components/sidebar-shop/components/sort-by/sort-by.component';
import { ByRatingPipe } from '../pipes/by-rating.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { NgxSliderModule } from 'ngx-slider-v2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceRangePipe } from '../pipes/price-range.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchBoxComponent } from './shop/components/main-shop/components/search-box/search-box.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    ShopComponent,
    SidebarShopComponent,
    MainShopComponent,
    CategoriesComponent,
    FilterByPriceComponent,
    FilterByRateComponent,
    ProductItemComponent,
    SortByComponent,
    SortByPipe,
    ByRatingPipe,
    PriceRangePipe,
    ProductDetailsComponent,
    SearchBoxComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSliderModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    ShopComponent,
  ]
})
export class PagesModule { }
