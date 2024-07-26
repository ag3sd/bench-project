import { createAction, props } from "@ngrx/store"

export const navigate = createAction('[nav] navigate', props<{ screen: string }>())
export const openCart = createAction('[nav] open Cart')
export const closeCart = createAction('[nav] close Cart')