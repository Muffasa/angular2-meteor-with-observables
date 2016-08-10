import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from "@angular/core";
import {MeteorComponent} from "angular2-meteor";
import template from "./products-list.component.html";
import {ProductsService} from "./products.service";
import {Product} from "../../../both/models/product-object";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ProductsActions} from "./products.actions";

@Component({
  selector: 'products',
  template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductsService]
})
export class ProductsListComponent extends MeteorComponent implements OnInit, OnDestroy {
  private products$:Observable<Product>;

  constructor(public _store:Store<any>) {
    super();

    this.products$ = this._store.select("products");
  }

  ngOnInit() {
    this._store.dispatch({type: ProductsActions.SUBSCRIBE_PRODUCTS});
  }

  add(product:Product) {
    this._store.dispatch({type: ProductsActions.INSERT_PRODUCT, payload: product});
  }

  remove(productId:string) {
    this._store.dispatch({type: ProductsActions.REMOVE_PRODUCT, payload: productId});
  }

  addBadProduct() {
    let invalidProduct = {name: 3};
    this._store.dispatch({type: ProductsActions.INSERT_PRODUCT, payload: invalidProduct});
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this._store.dispatch({type: ProductsActions.UNSUBSCRIBE_PRODUCTS});
  }
}
