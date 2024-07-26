import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable, switchMap } from 'rxjs';
import { CommonService, Data } from '../common.service';

@Component({
  selector: 'bench-project-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$: Observable<any>;
  cartItems$;
  selectedCategory;
  catogories$: Observable<any>;
  constructor(private service: CommonService) {
    this.selectedCategory = service.current[Data.CATEGORY];
    this.catogories$ = service.getCatogories().pipe(
      // mergeMap((d) =>),
      map((d) => {
        this.setCategory(d[0]);
        return d;
      }));
    this.products$ = service.current[Data.CATEGORY].pipe(switchMap(cat => {
      return service.getProducts().pipe(map(arr => {
        return arr.filter((e: { category: any; }) => e.category === cat);
      }))
    }),
    );
    this.cartItems$ = this.service.getCart();
  }
  buy(buyingId: string | number) {
    this.service.addToCart(buyingId);
  }

  setCategory(category: { id: string; }) {
    this.service.set(Data.CATEGORY, category.id);
  }

}
