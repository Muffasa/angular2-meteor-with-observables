import { Injectable } from '@angular/core';
import {ProductsCollection} from "../../../both/collections/products-collection";
import {MeteorObservable, ObservableMeteorSubscription} from "angular2-meteor";
import {Product} from "../../../both/models/product-object";
import undefined = Match.undefined;

@Injectable()
export class ProductsService {
  private productsSubscription : ObservableMeteorSubscription;

  constructor() {}

  public subscribeProducts() {
    if (!this.productsSubscription) {
      this.productsSubscription = MeteorObservable.subscribe("products");
    }

    return this.productsSubscription;
  }

  public unsubscribeProducts() {
    if (this.productsSubscription) {
      this.productsSubscription.stop();
      this.productsSubscription = undefined;
    }
  }

  public addProduct(product : Product) {
    return MeteorObservable.call("addProduct", product);
  }

  public getProducts() {
    return ProductsCollection.find({});
  }
}
