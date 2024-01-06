import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category, Product, PhotosApi } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl: string = 'https://fakestoreapi.com'
  private http = inject(HttpClient);

  public currentCategory: Subject<Category | null > = new Subject();
  public currentCategory$: Observable<Category | null> = this.currentCategory.asObservable();
  public products: Product[] = [];
  public categories: Category[] = [];
  public orderBy: string | '' = '';
  public currentRating: number  = 0;
  public minPrice: number = 0;
  public maxPrice: number = 700;



  setCurrentCategory(category: Category | null): void {
    this.currentCategory.next(category)
  }

  setOrderBy(newSort: string): void {
    this.orderBy = newSort;
  }

  setCurrentRating(rating: number) {
    this.currentRating = rating;
  }

  setPriceRange(min: number, max: number) {
    this.maxPrice = max;
    this.minPrice = min;
  }

  setFiltersToNull() {
    this.setCurrentCategory(null);
    this.setOrderBy('');
    this.setCurrentRating(0);
    this.setPriceRange(0,700);
  }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/products/categories`).pipe(
      tap((categories: Category[]) => this.categories = categories),
      catchError(err => throwError(() => 'Error cargando datos de FakeStore API')))
  }

  getProducts(term?: string): Observable<Product[]> {
    console.log(term);
    if (term) {
      this.setFiltersToNull();
      return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
        map((products: Product[]) => products.filter(product => product.title.toLowerCase().includes(term.toLowerCase()))),
        tap((products: Product[]) => this.products = products)
      )
    }
    console.log('entra');
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      tap((products: Product[]) => this.products = products)
    )
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }

  getProductsByCategory(category: Category | null): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`).pipe(
      tap((products: Product[]) => this.products = products)
    )
  }

  resetFilters() {
    this.setCurrentCategory(null);
    this.setCurrentRating(0);
    this.setOrderBy('');
    this.setPriceRange(0,700);
  }


}
