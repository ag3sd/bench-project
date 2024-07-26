import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { CommonService, Data } from '../common.service';

@Component({
  selector: 'bench-project-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {


  cartItems: any;
  cartItemIds: string | any[] = [];
  cartProducts$: Observable<any>;
  totalCost = 0;
  carProductsCount = 0;

  constructor(public service: CommonService) {
    this.cartProducts$ = this.service.getCart().pipe(
      switchMap((cartItems) => {
        this.cartItems = cartItems;
        this.cartItemIds = Object.keys(cartItems);

        return this.service.getProducts().pipe(
          map(products => products.filter((e: { id: any; }) => this.cartItemIds.includes(e.id))),
          map(products => {
            this.totalCost = 0;
            this.carProductsCount = products.length;
            if (products.length > 1) {
              products.forEach((e: { id: string | number; price: number; }) => {
                this.totalCost += cartItems[e.id] * e.price;
              });
            } else if (products.length === 1) {
              this.totalCost = cartItems[products[0].id] * products[0].price;
            }
            return products;
          }))
      }));

  }
  closeCart() {
    this.service.current[Data.CARTOPEN].next(false);
  }
  add(id: string | number) {
    this.service.addToCart(id);
  }
  remove(id: string | number) {
    this.service.removeFromCart(id);
  }
}
