import { Injectable } from '@angular/core';
import { debounceTime, fromEvent  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public visible = false;


  openSearch() {
    this.visible = true
  }

  closeSearch() {
    this.visible = false;
  }

  toggleSearch() {
    this.visible = !this.visible;
  }



}
