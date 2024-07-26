import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CommonService, Screens } from '../common.service';
import * as NavActions from './nav.actions';
import { cartState } from './nav.reducer';

export type navItem = {
  name: string;
  route: string;
}
@Component({
  selector: 'bench-project-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  cartItemIds$: Observable<string[]>;
  cartOpen$;
  constructor(private service: CommonService, private store: Store) {
    this.cartOpen$ = store.select(cartState);
    this.cartItemIds$ = this.service.getCart().pipe(map(cartItems => Object.keys(cartItems)));
  }


  navClick(name: keyof typeof Screens) {
    this.store.dispatch(NavActions.navigate({ screen: Screens[name] }));
  }

  openCart() {
    this.store.dispatch(NavActions.openCart());
  }
}
