import { Component, inject, OnInit } from '@angular/core';
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
