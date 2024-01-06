import { HostListener, Injectable, computed, signal } from '@angular/core';
import { EMPTY, Observable, debounceTime, fromEvent, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  public width$: Observable<number> = EMPTY;

  constructor() {
    this.width$ = fromEvent(window, 'resize').pipe(
      map((event) =>{
        return window.innerWidth;
      })
    );
  }

}
