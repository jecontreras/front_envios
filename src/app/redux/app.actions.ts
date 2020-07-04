import { Action } from "@ngrx/store";

export let CART          = '[App] Cart';
export let USER          = '[App] User';
export let USERCABEZA    = '[App] UserCabeza';

export class CartAction implements Action {
    readonly type = CART;
    constructor( public payload: object,  public opt: string){}
}

export class UserAction implements Action {
    readonly type = USER;
    constructor( public payload: object,  public opt: string){}
}

export class UserCabezaAction implements Action {
    readonly type = USERCABEZA;
    constructor( public payload: object,  public opt: string){}
}

export type actions = CartAction         |
                      UserAction         |
                      UserCabezaAction   ;