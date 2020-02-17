import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey: string = "f6ad746c8f7fafad920f41eba4a13df2";
  private urlMoviedb: string = "https://api.themoviedb.org/3";

  peliculas:any[] = [];

  constructor(
      private _http:HttpClient
  ) { }

  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    let desdeStr = `${ desde.getFullYear()}-${desde.getMonth()+1}-${desde.getDate()}`;
    let hastaStr = `${ hasta.getFullYear()}-${hasta.getMonth()+1}-${hasta.getDate()}`;

    const url =`${this.urlMoviedb}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    return this._http.jsonp(url, '').pipe(map( (res: any) =>  res.results ));
  }

  getPopulares() {
      const url =`${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
      return this._http.jsonp(url, '').pipe(map( (res: any) =>  res.results ));
  }

  getPopularesNinos() {
      const url =`${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
      return this._http.jsonp(url, '').pipe(map( (res: any) =>  res.results ));
  }

  buscarPelicula( texto:string ){
     let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

     return this._http.jsonp( url, '' ).pipe(map( (res: any) =>  {
       this.peliculas = res.results;
       console.log(res.results);
       res.results
     } ));
  }

  getPelicula( id:string ){
     let url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;
     return this._http.jsonp(url, '').pipe(map( (res: any) =>  {
       return res} ));
  }




}
