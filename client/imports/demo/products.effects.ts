import {ProductsState} from "./products.reducer";
import {StateUpdates, Effect, toPayload} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {ProductsService} from "./products.service";
import {ProductsActions} from "./products.actions";
import {Product} from "../../../both/models/product-object";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ProductsEffects {
  constructor(private updates$:StateUpdates<ProductsState>, private productsService:ProductsService) {

  }

  @Effect() subscribeProducts$ = this.updates$
    .whenAction(ProductsActions.CALL_SUBSCRIBE_PRODUCTS)
    .switchMap(() => this.productsService.subscribeProducts())
    .map(() => ({type: ProductsActions.LOAD_PRODUCTS_FROM_COLLECTION}));

  @Effect() unsubscribeProducts$ = this.updates$
    .whenAction(ProductsActions.CALL_UNSUBSCRIBE_PRODUCTS)
    .switchMap(() => {
      this.productsService.unsubscribeProducts();

      return Observable.of({type: ProductsActions.PRODUCTS_COLLECTION_UPDATED});
    });

  @Effect() loadProducts$ =  this.productsService.getProducts()
    .map(products => ({type: ProductsActions.PRODUCTS_COLLECTION_UPDATED, payload: products}));

  @Effect() addProduct$ = this.updates$
    .whenAction(ProductsActions.ADD_PRODUCTS)
    .map(toPayload)
    .switchMap((product: Product) => this.productsService.addProduct(product)
      .map(productId => ({type: ProductsActions.ADD_PRODUCT_SUCCESS, payload: productId}))
      .catch(e => (Observable.of({ type: ProductsActions.ADD_PRODUCT_FAIL, payload: e })))
    );
}
