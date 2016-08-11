import { Injectable } from '@angular/core';
import {ProductsCollection} from "../../../both/collections/products-collection";
import {MeteorObservable, ObservableMeteorSubscription} from "angular2-meteor";
import {Product} from "../../../both/models/product-object";

@Injectable()
export class ProductsService {
  private productsSubscription : ObservableMeteorSubscription;
  private collectionObservable;

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

  public insertProduct(product : Product) {
    return MeteorObservable.call("insertProduct", product);
  }
  public updateProduct(product : Product) {
    return MeteorObservable.call("updateProduct", product);
  }
  public removeProduct(productId : string) {
    return MeteorObservable.call("removeProduct", productId);
  }

  public getProducts() {
    if (!this.collectionObservable) {
      this.collectionObservable = ProductsCollection.find({});
    }

    return this.collectionObservable;
  }
}
