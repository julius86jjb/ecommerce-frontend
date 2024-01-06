import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';


@Pipe({
  name: 'sortBy'
})

export class SortByPipe implements PipeTransform {
  transform(products: Product[], sortBy?: string | ''): Product[] {
    switch (sortBy) {
      case 'price_asc':
        return products.sort((a, b) => (a.price > b.price) ? 1 : -1)
      case 'price_desc':
        return products.sort((a, b) => (a.price < b.price) ? 1 : -1)
      case 'rate_asc':
        return products.sort((a, b) => (a.rating.rate > b.rating.rate) ? 1 : -1)
      case 'rate_desc':
        return products.sort((a, b) => (a.rating.rate < b.rating.rate) ? 1 : -1)
      case '':
        return products.sort((a, b) => (a.id > b.id) ? 1 : -1)
      default:
        return products
    }
  }
}
