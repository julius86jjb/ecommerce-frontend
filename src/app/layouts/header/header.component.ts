import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription | undefined;

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private cartService = inject(CartService);

  public currentCategory: Category | null = null

  public showMobileMenu: boolean = false;

  public cartItems: number = 0;



  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$
      .subscribe((cart) => {
        this.cartItems = cart.items.length
      })
  }

  openMobileMenu() {
    this.showMobileMenu = true
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

}
