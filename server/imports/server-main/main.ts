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
            },
            updateProduct: function (product) {
                // TODO fiber!
                    let future = new Npm.require("fibers/future")();
                if (!product.name || typeof product.name !== "string") {
                    let origin = ProductsCollection.findOne(product._id);
                    return {err: "temp fail", origin};
                }

                return ProductsCollection.update(product._id, {$set: {name: product.name}});

            }
            //dispatcher: function (action):_action {
            //    let future = new Npm.require("fibers/future")();
            //    let reaction;
            //    let product = action.payload;
            //    let origin = ProductsCollection.findOne(product._id);
            //
            //    if (!product.name || typeof product.name !== "string")
            //        reaction = {
            //            action: ProductsActions.UPDATE_PRODUCT_FAIL,
            //            payload: origin
            //        }
            //
            //    ProductsCollection.update(product._id, {$set: {name: product.name}}, (err) => {
            //        reaction = err ? reaction : {action: ProductsActions.UPDATE_PRODUCT_SUCCESS}
            //        future.return(reaction);
            //    });
            //    return future.wait();
            //}
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
