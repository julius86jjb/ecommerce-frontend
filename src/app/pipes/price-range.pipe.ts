import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';


@Pipe({
  name: 'priceRange'
})

export class PriceRangePipe implements PipeTransform {
  transform(products: Product[], min: number, max: number): Product[] {
    return products.filter((a) => (a.price > min && a.price < max ) )
  }
}
