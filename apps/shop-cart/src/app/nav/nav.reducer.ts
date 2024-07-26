import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as NavActions from "./nav.actions";

export interface NavState {
    screen: string;
    cartOpen: boolean;
}

export const initialState: NavState = {
    screen: 'home',
    cartOpen: false,
};

export const navReducer = createReducer(initialState,
    on(NavActions.navigate, (state, { screen }) => ({ ...state, screen })),
    on(NavActions.openCart, (state) => ({ ...state, cartOpen: true })),
    on(NavActions.closeCart, (state) => ({ ...state, cartOpen: false })),
)

export const selectNav = createFeatureSelector<NavState>('nav');

export const cartState = createSelector(selectNav, (state: NavState) => state.cartOpen);
export const selectScreen = createSelector(selectNav, (state: NavState) => state.screen);