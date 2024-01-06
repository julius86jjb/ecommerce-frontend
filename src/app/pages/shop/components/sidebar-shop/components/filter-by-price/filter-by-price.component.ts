import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from 'ngx-slider-v2';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.scss']
})
export class FilterByPriceComponent {

  @Input() public  minValue: number = 0;
  @Input() public  maxValue: number = 700;

  private shopService = inject(ShopService);


  public options: Options = {
    floor: 0,
    ceil: 700,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  onFilterByPrice(min: number, max: number): void {
    console.log(min,max);
    this.shopService.setPriceRange(min, max);
  }

}
