import { Injectable } from '@angular/core';
import { debounceTime, fromEvent  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public visible = false;


  openSearch() {
    this.visible = true
    console.log('pasa por servicio')
    console.log(this.visible);
  }

  closeSearch() {
    this.visible = false;
  }

  toggleSearch() {
    this.visible = !this.visible;
  }



}
