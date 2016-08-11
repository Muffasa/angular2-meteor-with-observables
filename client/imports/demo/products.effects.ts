import {StateUpdates, Effect, toPayload} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {ProductsService} from "./products.service";
import {ProductsActions} from "./products.actions";
import {Product} from "../../../both/models/product-object";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ProductsEffects {
  constructor(private updates$:StateUpdates<any>, private productsService:ProductsService) {

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

  @Effect() syncProducts$ =  this.productsService.getProducts()
    .map(products => ({type: ProductsActions.PRODUCTS_SYNCED, payload: products}));

  @Effect() insertProduct$ = this.updates$
    .whenAction(ProductsActions.INSERT_PRODUCT)
    .map(toPayload)
    .switchMap((product: Product) => this.productsService.insertProduct(product)
      .map(productId => ({type: ProductsActions.INSERT_PRODUCT_SUCCESS, payload: productId}))
      .catch(e => (Observable.of({ type: ProductsActions.INSERT_PRODUCT_FAIL, payload: e })))
    );
    @Effect() removeProduct$ = this.updates$
        .whenAction(ProductsActions.REMOVE_PRODUCT)
        .map(toPayload)
        .switchMap((productId: string) => this.productsService.removeProduct(productId)
         .map(productId => ({type: ProductsActions.REMOVE_PRODUCT_SUCCESS, payload: productId}))
         .catch(e => (Observable.of({ type: ProductsActions.REMOVE_PRODUCT_FAIL, payload: e })))
        );
    @Effect() updateProduct$ = this.updates$
       .whenAction(ProductsActions.UPDATE_PRODUCT)
       .map(toPayload)
       .switchMap((product: Product) => this.productsService.updateProduct(product)
         .map(response => {
             console.log(`update response. response:${response}`);
            if(response.err)
                return ({type: ProductsActions.UPDATE_PRODUCT_FAIL, payload: response.origin});

             return ({type: ProductsActions.UPDATE_PRODUCT_SUCCESS})
         })
         .catch(e => (Observable.of({ type: ProductsActions.UPDATE_PRODUCT_FAIL, payload: e })))
       );
}
