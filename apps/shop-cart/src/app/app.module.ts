import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { StoreModule } from '@ngrx/store';
import { navReducer } from './nav/nav.reducer';

export const reducer = {
  nav: navReducer
}
export interface State {
  nav: string;
}
@NgModule({
  declarations: [AppComponent, LayoutComponent, NavComponent, CartDetailsComponent, HomeComponent, ProductsComponent],
  imports: [BrowserModule, HttpClientModule, CommonModule, FormsModule, StoreModule.forRoot(reducer)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
