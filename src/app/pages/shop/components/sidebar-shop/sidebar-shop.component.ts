import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { ShopService } from '../../../../services/shop.service';

@Component({
  selector: 'app-sidebar-shop',
  templateUrl: './sidebar-shop.component.html',
  styleUrls: ['./sidebar-shop.component.css']
})
export class SidebarShopComponent implements OnInit{

  public shopService = inject(ShopService)

  ngOnInit(): void {

  }

  onResetFilters() {
    this.shopService.resetFilters();
  }

  get minPrice() {
    return this.shopService.minPrice;
  }

  get maxPrice() {
    return this.shopService.maxPrice
  }
}
