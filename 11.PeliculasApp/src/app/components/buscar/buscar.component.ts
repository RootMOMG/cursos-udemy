import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {PeliculasService} from '../../services/peliculas.service';
import {PeliculaImagenPipe} from '../../pipes/pelicula-imagen.pipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  buscar: string;

  constructor(private _ps: PeliculasService,
              private router: ActivatedRoute) {
                this.router.params.subscribe( parametros => {
                  console.log(parametros);
                  if(parametros['texto']) {
                    this.buscar = parametros['texto'];
                    this.buscarPelicula();
                  }
                } )
  }

  ngOnInit() {
  }

  buscarPelicula(){
    if (this.buscar.length == 0) {
      return;
    }
    this._ps.buscarPelicula( this.buscar )
                            .subscribe()
  }

}
