/*
 AppStore interface that simplifies the redux design pattern to new comers
 */
import {Product} from "../both/models/product-object";
export interface  AppStore {
    products: Product[];
}