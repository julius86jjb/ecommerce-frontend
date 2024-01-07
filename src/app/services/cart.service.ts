import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/interfaces/cart.interface';

@Injectable({ providedIn: 'root' })


export class CartService {

  private cart = new BehaviorSubject<Cart>({items: []})

  constructor() {
    this.loadLocalStorage();
  }

  get cart$(): Observable<Cart> {
    return this.cart;
  }


  private saveLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart.value))
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('cart')) return;
    this.cart.next(JSON.parse(localStorage.getItem('cart')!));
  }


  addToCart(item: CartItem): void {
    const items: CartItem[] = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.product.id === item.product.id)

    if (itemInCart) {
      itemInCart.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cart.next({ items: items });
    this.saveLocalStorage()


  }

  removeQuantity(item: CartItem) {
    const items: CartItem[] = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.product.id === item.product.id)

    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1;
      } else {
        this.removeFromCart(item);
      }
    }

    this.saveLocalStorage()

  }


  removeFromCart(item: CartItem) {
    const items: CartItem[] = [...this.cart.value.items];
    const itemsFiltered = items.filter((_item) => _item.product.id !== item.product.id)
    this.cart.next({ items: itemsFiltered });
    this.saveLocalStorage()
  }

  clearAll() {
    this.cart.value.items = [];
    this.saveLocalStorage()
  }

  getTotal(): number {
    const items: CartItem[] = [...this.cart.value.items];
    return items.map((item) => item.product.price * item.quantity)
      .reduce((acc, v) => acc + v, 0);
  }

}
