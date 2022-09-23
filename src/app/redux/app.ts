
import * as _action from './app.actions';
import * as _ from 'lodash';
import { STORAGES } from '../interfaces/sotarage';

let APP = dropt();
let data:any;
function dropt(){
  let data_stora:STORAGES = {};
  return data_stora;
}
export function appReducer(state: STORAGES = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) {
    state = JSON.parse(localStorage.getItem('APP'));
    validacion_key(state);
  }
  else {
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(state));
  }
  // console.log(state);
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
    state = JSON.parse(localStorage.getItem('APP'));
    return state
  }
  function proceso_data(lista:any, data:any, opt){
    let idx = _.findIndex(lista, ['id', data.id]);
    if(idx >-1){
      if(opt === 'delete') lista.splice(idx, 1);
      else lista[idx]= data;
    }else{
      if(opt === 'post') lista.push(data);
    }
    return lista;
  }
  function validacion_key(state: STORAGES){
    //if(!state.articulos) state.articulos = [];
    if(!state.cart) state.cart = [];
    if(!state.user) state.user = {};
    if(!state.usercabeza) state.usercabeza = {};
  }
  switch (action.type) {
    case _action.CART:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.cart) state.cart = [];
          data = proceso_data(state.cart,action.payload, 'post');
          state.cart = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.cart,action.payload, 'put');
          state.cart = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.cart,action.payload, 'delete');
          state.cart = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.cart = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    case _action.USER: {
      switch(action.opt) {
        case 'post' :
          if(!state.user) state.user = {};
            state.user = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.user = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.user = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.user = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.USERCABEZA: {
      switch(action.opt) {
        case 'post' :
          if(!state.usercabeza) state.usercabeza = {};
            state.usercabeza = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.usercabeza = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.usercabeza = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.usercabeza = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.PRODUCTOHISTORIAL:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.productoHistorial) state.productoHistorial = [];
          data = proceso_data(state.productoHistorial,action.payload, 'post');
          state.productoHistorial = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.productoHistorial,action.payload, 'put');
          state.productoHistorial = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.productoHistorial,action.payload, 'delete');
          state.productoHistorial = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.productoHistorial = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    case _action.BUSCADOR: {
      switch(action.opt) {
        case 'post' :
          if(!state.buscador) state.buscador = {};
            state.buscador = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.buscador = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.buscador = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.buscador = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.DATAGUIDE: {
      switch(action.opt) {
        case 'post' :
          if(!state.dataGuide) state.dataGuide = {};
            state.dataGuide = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.dataGuide = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.dataGuide = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.dataGuide = {};
          return local_Storage(state);
        }
        break;
      }
    }
    default: return state;
  }
}
