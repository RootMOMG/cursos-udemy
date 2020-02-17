import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos:any[]=[];
  loading:boolean = true;

  constructor(private _productosService: ProductosService) {
    this._productosService.getProductos()
      .subscribe(data => {
        // this.loading = false;
        setTimeout( ()=> {
          this.loading = false
          this.productos = data;
        }, 1200 );
      })
  }

  ngOnInit() {
  }

  borraProducto(key$: string) {
    this._productosService.borraProducto(key$)
      .subscribe( data => {
        if(data) {
          console.error(data);
        } else {
          // Todo bien
          delete this.productos[key$];
        }
      })
  }

}
