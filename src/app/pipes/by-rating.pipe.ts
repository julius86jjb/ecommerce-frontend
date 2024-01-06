import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';


@Pipe({
  name: 'byRating'
})

export class ByRatingPipe implements PipeTransform {
  transform(products: Product[], rating?: number): Product[] {
    switch (rating) {
      case 1:
        return products.filter((a) => (a.rating.rate > 0.5) )
      case 2:
        return products.filter((a) => (a.rating.rate > 1.5))
      case 3:
        return products.filter((a) => (a.rating.rate > 2.5))
      case 4:
        return products.filter((a) => (a.rating.rate > 3.5))
      case 0:
        return products
      default:
        return products
    }
  }
}
