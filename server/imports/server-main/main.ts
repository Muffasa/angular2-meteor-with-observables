import {Product} from "../../../both/models/product-object";
import {ProductsCollection} from "../../../both/collections/products-collection";

export class Main {
  constructor() {
  }

  start():void {
    this.initFakeData();

    Meteor.publish("products", () => {
      return ProductsCollection.getMongoCollection().find({});
    });

    Meteor.methods({
      insertProduct: function (product) {
        // TODO: implement check for interfaces
        // example : check(product, Product)
        check(product.name, String);

        if (!product.name)
          throw new Meteor.Error("product name can't be empty");

        return ProductsCollection.insert(product);
      },
      removeProduct: function (productId) {
          // TODO: check permissions
        check(productId, String);

        if (!productId)
          throw new Meteor.Error("no product id");

        return ProductsCollection.remove(productId);
      }
    })
  }

  initFakeData():void {
    if (ProductsCollection.getMongoCollection().find({}).count() === 0) {
      ProductsCollection.insert(<Product>{
        name: 'Dotan'
      });

      ProductsCollection.insert(<Product>{
        name: 'Liran'
      });

      ProductsCollection.insert(<Product>{
        name: 'Uri'
      });
    }
  }
}
