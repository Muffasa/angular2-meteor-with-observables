import {ActionReducer, Action} from "@ngrx/store";
import {ProductsActions} from "./products.actions";
import {Product} from "../../../both/models/product-object";
import {Observable} from "rxjs";

export interface ProductsState {
  products: Observable<Product>;
}

export const productsReducer : ActionReducer<ProductsState> = (state : ProductsState, action : Action) => {
    switch (action.type) {
      case ProductsActions.PRODUCTS_SYNCED: {
        return Object.assign({}, state, { products: action.payload });
      }

      case ProductsActions.INSERT_PRODUCT_SUCCESS: {
        console.log("Created new item:", action.payload);

        return state;
      }

      case ProductsActions.INSERT_PRODUCT_FAIL: {
        console.log("Error creating new item:", action.payload);

        return state;
      }

      default:
        return state;
    }
};