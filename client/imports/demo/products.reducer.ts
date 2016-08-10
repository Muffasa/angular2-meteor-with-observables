/*
 General collection reducer.
 all the client actions on the DB must take place via a dispatcher, its a bad practice to see Collection.insert/update/remove on the client side.
 only Collection.find should be called on the client side, and thats also just because the way meteor works.
 there might be several subscriptions, not only general collection, depending on the server publications.
*/
import {ProductsActions} from "./products.actions";
export const productsReducer = (state:any = [], {type, payload}) => {
  switch (type) {

      //@Client action
    case ProductsActions.SUBSCRIBE_PRODUCTS:
      // just triggers data subscription to the server
      return state;
      //@Server action
    case ProductsActions.SUBSCRIBE_PRODUCTS_SUCCESS:
      // notifies the client the the cursor will be synced by the server publication restrictions
      return state;
      //@Server action
    case ProductsActions.SUBSCRIBE_PRODUCTS_FAIL:
      // offline mode, all changes will take place in the app state and will be saved to the local storage for later sync.
      return state;

      //@Server action
    case ProductsActions.PRODUCTS_SYNCED:
      // the server pushes the current state reactively. based on currently active data subscriptions.
      return payload;

      //@Client action
    case ProductsActions.INSERT_PRODUCT:
      //instantly add the product for latency compensation
      return [...state, payload];
      //@Server action
    case ProductsActions.INSERT_PRODUCT_SUCCESS:
      // do nothing, the action was legit
      return state;
      //@Server action
    case ProductsActions.INSERT_PRODUCT_FAIL:
      // undo the invalid action
      return state.filter(product => {
        return !!product._id;
      });


      //@Client action
    case ProductsActions.UPDATE_PRODUCT:
      //instantly update the product for latency compensation
      return state.map(product => {
        return product._id === payload._id ? Object.assign({}, product, payload) : product;
      });
      //@Server action
    case ProductsActions.UPDATE_PRODUCT_SUCCESS:
      return state;
      //@Server action
    case ProductsActions.UPDATE_PRODUCT_FAIL:
      // undo the invalid changes, the payload is the valid product
      return state.map(product => {
        return product._id === payload._id ? Object.assign({}, product, payload) : product;
      });

      //@Client action
    case ProductsActions.REMOVE_PRODUCT:
      //instantly remove the product for latency compensation, notice the payload is the id and not the entire product.cbvcvb
      return state.filter(product => {
        return product._id !== payload;
      });
      //@Server action
    case ProductsActions.REMOVE_PRODUCT_SUCCESS:
      // do nothing, optional ui actions with effects
      return state;
      //@Server action
    case ProductsActions.REMOVE_PRODUCT_FAIL:
      // undo the invalid removal, the payload is the not permited removed item.
      return [...state, payload];

    default:
      return state;
  }

};

;
