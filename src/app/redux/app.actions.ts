import { Action } from "@ngrx/store";

export let CART          = '[App] Cart';
export let USER          = '[App] User';
export let USERCABEZA    = '[App] UserCabeza';
export let PRODUCTOHISTORIAL = '[App] Productohistorial';
export let BUSCADOR      = '[App] Buscador';
export let SELECCIONCATEGORIA = '[App] SeleccionCategoria';

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

export class ProductoHistorialAction implements Action {
    readonly type = PRODUCTOHISTORIAL;
    constructor( public payload: object,  public opt: string){}
}

export class BuscadorAction implements Action {
    readonly type = BUSCADOR;
    constructor( public payload: object,  public opt: string){}
}

export class SeleccionCategoriaAction implements Action {
    readonly type = SELECCIONCATEGORIA;
    constructor( public payload: object,  public opt: string){}
}

export type actions = CartAction              |
                      UserAction              |
                      UserCabezaAction        |
                      ProductoHistorialAction |
                      BuscadorAction          |
                      SeleccionCategoriaAction;