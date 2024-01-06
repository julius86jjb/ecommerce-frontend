import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ShopService } from '../../../../services/shop.service';
import { Subscription } from 'rxjs';
import { Category, Product } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-main-shop',
  templateUrl: './main-shop.component.html',
  styleUrls: ['./main-shop.component.css']
})
export class MainShopComponent implements OnInit, OnDestroy {


  public selectedCategory: Category | null = null;
  public cargando: boolean = false;

  private shopService = inject(ShopService);
  private categorySubscription: Subscription | undefined;

  subsCategory: Subscription = new Subscription;

  ngOnInit(): void {
    this.getProducts();
    this.categorySubscription = this.shopService.currentCategory$
      .subscribe((category) => {
        if (category === null) {
          this.getProducts();
          return;
        }
        this.selectedCategory = category
        this.getProductsByCategory(category)
      })
  }

  get products() {
    return this.shopService.products;

  }

  get orderBy(): string | undefined {
    return this.shopService.orderBy
  }

  get rating(): number {
    return this.shopService.currentRating
  }

  get minPrice() {
    return this.shopService.minPrice;
  }

  get maxPrice() {
    return this.shopService.maxPrice;
  }


  getProducts(): void {
    this.cargando = true
    this.shopService.getProducts()
      .subscribe(() => {
        this.cargando = false;
        console.log(this.products);
    })
  }


  getProductsByCategory(category: Category | null ) {
    this.cargando = true
    this.shopService.getProductsByCategory(category)
      .subscribe(() => {
        this.cargando = false;
        console.log(this.products);
      })
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }





}
