import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Producto} from '../interfaces/producto.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductosService {

  productosURL: string = "https://tiendaapp-9167a.firebaseio.com/prodcutos.json"
  productoURL: string = "https://tiendaapp-9167a.firebaseio.com/prodcutos/"

  constructor( private http: Http ) { }

  nuevoProducto( producto: Producto) {
    let body = JSON.stringify( producto );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post( this.productosURL, body, { headers } )
        .pipe(map( res => {
          console.log(res.json());
            return res.json();
        }))
  }

  actualizarProducto( producto: Producto, key$:string) {
    let body = JSON.stringify( producto );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.productoURL }/${ key$ }.json`;

    return this.http.put( url, body, { headers } )
        .pipe(map( res => {
          console.log(res.json());
            return res.json();
        }))
  }

  getProducto( key$: string ) {
    let url = `${ this.productoURL }/${ key$ }.json`;
    return this.http.get(url)
      .pipe(map( res => res.json() ))
  }

  getProductos() {
    return this.http.get(this.productosURL)
      .pipe(map( res => res.json() ))
  }

  borraProducto(key$:string) {
    let url = `${ this.productoURL }/${ key$ }.json`;
    return this.http.delete(url)
      .pipe(map( res => res.json() ))
  }

}
