import { Component, inject } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent {


  shopService = inject(ShopService);

  get currentOrder() {
    return this.shopService.orderBy;
  }

  onOrderBy(newSort: string): void {
    if (newSort === this.currentOrder ) {
      this.shopService.setOrderBy('');
      return;
    }
    this.shopService.setOrderBy(newSort);
  }
}
