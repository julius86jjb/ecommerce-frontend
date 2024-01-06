import { Component, inject } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-filter-by-rate',
  templateUrl: './filter-by-rate.component.html',
  styleUrls: ['./filter-by-rate.component.css']
})
export class FilterByRateComponent {

  shopService = inject(ShopService);


  get currentRating() {
    return this.shopService.currentRating;
  }

  onRating(rating: number): void {
    if (rating === this.currentRating ) {
      this.shopService.setCurrentRating(0);
      return;
    }
    this.shopService.setCurrentRating(rating);
  }

}
