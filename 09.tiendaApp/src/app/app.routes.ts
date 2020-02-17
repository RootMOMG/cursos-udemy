import {RouterModule, Routes} from '@angular/router';
import {ProductosComponent} from './components/productos/productos.component';
import {ProductoComponent} from './components/productos/producto.component';

const APP_ROUTES: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'producto/:id', component: ProductoComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
