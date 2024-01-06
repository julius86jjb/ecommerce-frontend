
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/interfaces/product.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {


  private shopService = inject(ShopService)
  private catSubscription: Subscription | undefined;
  public currentCategory: Category | null = null

  ngOnInit(): void {
    this.getCategories();
    this.catSubscription = this.shopService.currentCategory$
      .subscribe((category) => {
        if (category === null) {
          this.currentCategory = null
        }
      })
  }

  onChangeCategory(category: Category) {
    if (category === this.currentCategory ) {
      this.currentCategory = null;
      this.shopService.setCurrentCategory(null);
      return;
    }
    this.currentCategory = category;
    this.shopService.setCurrentCategory(category);
  }



  getCategories() {
    this.shopService.getCategories().subscribe({
      error: (message) => {
        alert(message)
      }
    })
  }

  get categories() {
    return this.shopService.categories;
  }

  ngOnDestroy() {
    if (this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
  }

}
