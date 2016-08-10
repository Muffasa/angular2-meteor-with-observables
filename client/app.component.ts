import { Component } from '@angular/core';
import template from './app.component.html';
import {ProductsListComponent} from "./imports/demo/products-list.component";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";

@Component({
  selector: 'app',
  template,
  directives: [StoreLogMonitorComponent, ProductsListComponent]
})
export class AppComponent {
  constructor() {
  }
}
