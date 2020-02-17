import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Producto} from '../../interfaces/producto.interface';
import {ProductosService} from '../../services/productos.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  producto: Producto = {
    nombre: "",
    marca: "",
    precio: "",
  }

  nuevo:boolean = false;
  id: string;

  constructor(private _productosService: ProductosService,
              private router:Router,
              private route:ActivatedRoute) {
                this.route.params
                  .subscribe( parametros => {
                      this.id = parametros['id'];
                      if(this.id !== 'nuevo') {
                        this._productosService.getProducto( this.id )
                            .subscribe( data => this.producto = data)
                      }
                  })
              }

  ngOnInit() {
  }

  guardar() {
    console.log(this.producto);

    if(this.id == "nuevo") {
      // Insertando
      this._productosService.nuevoProducto(this.producto)
          .subscribe(data=> {
              this.router.navigate(['/producto', data.name])
          },
          error => console.error(error));
    } else {
      // actualizando
      this._productosService.actualizarProducto(this.producto, this.id)
          .subscribe(data=> {
              console.log(data);
          },
          error => console.error(error));
    }
  }

  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/producto', 'nuevo']);
    forma.reset({
      marca:"Apple"
    });
  }

}
