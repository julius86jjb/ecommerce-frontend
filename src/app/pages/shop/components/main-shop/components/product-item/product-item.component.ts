import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../../../../interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  private cartService = inject(CartService);

  @Input() public product!: Product;

  onAddToCart(): void {
    this.cartService.addToCart({
      product: this.product,
      quantity: 1
    })
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      title: `1 item added to cart`
    })
  }

}
