import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share, shareReplay } from 'rxjs';

export enum Screens {
  Home = "home",
  Products = "products",
};
export enum Data {
  SCREEN = "SCREEN",
  CATEGORY = "CATEGORY",
  CARTOPEN = "CARTOPEN",
  CART = "CART",
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  cart: { [key: string]: number } = {};

  current: { [key: string]: BehaviorSubject<any> } = {
    [Data.SCREEN]: new BehaviorSubject<any>(Screens['Home']),
    [Data.CATEGORY]: new BehaviorSubject(''),
    [Data.CARTOPEN]: new BehaviorSubject(false),
    [Data.CART]: new BehaviorSubject(this.cart),
  };
  items = [];
  constructor(private http: HttpClient) {

  }
  set(name: string, value: string) {
    this.current[name].next(value);
    // this.current[name].next(value);
  }
  get(name: string): Observable<any> {
    return this.current[name].asObservable();
  }
  getCart() {
    return this.current[Data.CART];
  }
  addToCart(id: string | number) {
    if (!this.cart[id]) {
      this.cart[id] = 1;
    } else {
      this.cart[id]++;
    }
    this.current[Data.CART].next(this.cart);
  }
  removeFromCart(id: string | number) {
    if (this.cart[id]) {
      this.cart[id]--;
    }
    if (this.cart[id] === 0) {
      delete this.cart[id];
    }
    this.current[Data.CART].next(this.cart);
  }
  getCatogories(): Observable<any> {
    return this.http.get('/api/categories').pipe(map((d: any) => {
      return d.filter((e: { enabled: boolean; }) => e.enabled)
        .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    }), share());
  }
  getProducts(): Observable<any> {
    return this.http.get('/api/products').pipe(share());
  }
  getOffers(): Observable<any> {
    return this.http.get('/api/offers').pipe(map((d: any) => d.filter((e: { isActive: any; }) => e.isActive)
      .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order)), share());
  }
}
