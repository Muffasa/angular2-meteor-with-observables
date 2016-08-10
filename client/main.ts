import {bootstrap} from "angular2-meteor-auto-bootstrap";

import {AppComponent} from "./app.component";
import {provideStore} from "@ngrx/store";
import {runEffects} from "@ngrx/effects";
import {productsReducer} from "./imports/demo/products.reducer";
import {ProductsService} from "./imports/demo/products.service";
import {ProductsEffects} from "./imports/demo/products.effects";
import {instrumentStore} from "@ngrx/store-devtools";
import { useLogMonitor } from '@ngrx/store-log-monitor';

bootstrap(AppComponent, [
    ProductsService,
    provideStore({products: productsReducer}),
    instrumentStore({
        monitor: useLogMonitor({
            // Default log monitor options
            position: 'right',
            visible: true,
            size: 0.3
        }),
    }),
    runEffects(ProductsEffects)

]).catch(err => console.error(err));
