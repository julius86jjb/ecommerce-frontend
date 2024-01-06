import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Cart, CartItem } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

import { Subscription, delay } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  private cartService = inject(CartService);
  private http = inject(HttpClient)
  private cartSubscription: Subscription | undefined;

  public cart: Cart = { items: [] };

  public cargando: boolean = false;





  ngOnInit(): void {
    this.cartSubscription = this.getCart();
  }

  getCart() {
    this.cargando = true;
    return this.cartService.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
      this.cargando = false;
    })
  }

  removeItem(item: CartItem) {
    this.cargando = true;
    setTimeout(() => {
      this.cartService.removeFromCart(item);
      this.cargando = false;
    }, 300);
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      title: `1 item removed to cart`
    })


  }

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart({product: item.product, quantity:1});
  }

  onSubtractQuantity(item: CartItem) {
    (item.quantity === 1) ? this.removeItem(item) : this.cartService.removeQuantity(item);
  }

  onUpdateCart() {
    this.cargando = true;
    setTimeout(() => {
      this.getCart();
      this.cargando = false;
    }, 300);
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      title: `Cart updated`
    })
  }

  onClearAll() {
    this.cargando = true;
    setTimeout(() => {
      this.cartService.clearAll();
      this.cargando = false;
    }, 300);
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      title: `Cart is cleared`
    })

  }

  onGetTotal(): number {
    return this.cartService.getTotal();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onCheckout(): void {
    this.http.post('https://ecommerce-express-server-hkqh.onrender.com/checkout', {
      items: this.cart.items
    }).subscribe(async(res:any) => {
      let stripe = await loadStripe('pk_test_51OVWQLHOraHpQAo7SvxNYnVPg0tncxHijJ6bSRZdtIIYu8Zra5MgmEzUR0M5U7IIGx4y1Ds9cOgRL1fzCu4W6BOk00Vg3livCs');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
      this.cartService.clearAll();
    })
  }

}
