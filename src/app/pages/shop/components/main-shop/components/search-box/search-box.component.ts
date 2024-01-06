import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',


})
export class SearchBoxComponent {

  @ViewChild('txtTermInput') public txtTerm!: ElementRef<HTMLInputElement>;
  public currentSearch: string = ''

  constructor(private shopService: ShopService) { }


  onSearch(term: string) {
    if(!term){
      return;
    }
    this.shopService.getProducts(term)
      .subscribe(() => {
        this.txtTerm.nativeElement.value = '';
        this.currentSearch = term;
      })
  }

  clearSearch(): void {
    this.shopService.getProducts()
      .subscribe(() => this.currentSearch = '')
  }

}
