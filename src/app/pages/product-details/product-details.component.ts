import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/app/interfaces/product.interface';
import { ShopService } from '../../services/shop.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { Subscription, throwError } from 'rxjs';
import { Location } from "@angular/common";
import { FormControl, Validators, } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';



@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  private activatedRoute = inject(ActivatedRoute);
  private shopService = inject(ShopService)
  private cartService = inject(CartService);
  private routeSubscription: Subscription | undefined;

  public loading: boolean = false;
  public product!: Product;
  public productsRelated!: Product[];

  public quantity: FormControl = new FormControl(1, [Validators.required, Validators.min(1)]);

  public customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  // public toastMixin = Swal.mixin({

  // });

  constructor(
    private readonly http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params
      .subscribe(({ id }) => {
        this.loadProduct(id)
      })

  }

  goBack(): void {
    this.location.back();
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.shopService.getProductById(id)
      .subscribe((product: Product) => {
        this.product = product;
        this.loading = false;
        this.getProductsRelated(this.product)
      })
  }

  getProductsRelated(product: Product): void {
    this.shopService.getProductsByCategory(product.category)
      .subscribe((products) => {
        console.log(products);
        this.productsRelated = products.filter((item) => item.id !== product.id)
      })
  }

  onAddToCart(): void {
    this.cartService.addToCart({
      product: this.product,
      quantity: this.quantity.value
    })
    let nItems: string;
    (this.quantity.value > 1) ? nItems = 'items' : nItems = 'item'
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      title: `${this.quantity.value} ${nItems} added to cart`
    })
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }



}
