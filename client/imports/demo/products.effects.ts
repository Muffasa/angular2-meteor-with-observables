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
    .whenAction(ProductsActions.SUBSCRIBE_PRODUCTS)
    .switchMap(() => this.productsService.subscribeProducts())
    .map(() => ({type: ProductsActions.SUBSCRIBE_PRODUCTS_SUCCESS}))
                                     .catch(e => (Observable.of({ type: ProductsActions.SUBSCRIBE_PRODUCTS_FAIL, payload: e })))

  @Effect() unsubscribeProducts$ = this.updates$
    .whenAction(ProductsActions.UNSUBSCRIBE_PRODUCTS)
    .switchMap(() => {
      this.productsService.unsubscribeProducts();

      return Observable.of({type: ProductsActions.PRODUCTS_UNSUBSCRIBED});
    });

  @Effect() loadProducts$ =  this.productsService.getProducts()
    .map(products => ({type: ProductsActions.PRODUCTS_SYNCED, payload: products}));

  @Effect() addProduct$ = this.updates$
    .whenAction(ProductsActions.INSERT_PRODUCT)
    .map(toPayload)
    .switchMap((product: Product) => this.productsService.addProduct(product)
      .map(productId => ({type: ProductsActions.INSERT_PRODUCT_SUCCESS, payload: productId}))
      .catch(e => (Observable.of({ type: ProductsActions.INSERT_PRODUCT_FAIL, payload: e })))
    );
}
