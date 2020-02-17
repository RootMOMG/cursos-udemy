import { Component, OnInit } from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';
import {PeliculaImagenPipe} from '../../pipes/pelicula-imagen.pipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula:any;
  regresarA: string = "";
  busqueda:string = "";

  constructor(private _ps: PeliculasService,
              private router: ActivatedRoute) {
                this.router.params.subscribe( parametros => {
                  console.log(parametros);
                  this.regresarA = parametros['pag'];
                  if(parametros['busqueda']) {
                    this.busqueda = parametros['busqueda'];
                  }
                  this._ps.getPelicula(parametros['id'])
                      .subscribe( pelicula => this.pelicula=pelicula )
                } )
  }

  ngOnInit() {
  }

}
