import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { Options } from '@angular-slider/ngx-slider';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [GlobalService]
})
export class BuscadorComponent implements OnInit {

  faSearch = faSearch;
  faSearchengin = faSearchengin;

  public estados: any;
  public categorias: any;
  public ubicaciones: any;
  public habitaciones_banos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public plus = 'ó más';
  public searchParams: any;
  public monedas: any;

  pMin: number = 0;
  pMax: number = 15000000;
  options: Options = {
    floor: 0,
    ceil: 15000000
  };  

  constructor(
    private _globalService: GlobalService,
    private _route: Router
  ) { 
    this.searchParams = {
      estado: '0',
      categoria: '0',
      ubicacion: '0',
      habitaciones: 1,
      banos: 1,
      precioI: this.pMin,
      precioF: this.pMax,
      moneda: '0'
    };
  }

  ngOnInit(): void {
    this.getEstados();
    this.getCategorias();
    this.getUbicaciones();
    this.getMonedas();
  }

  goSearch() { 
    this.searchParams.precioI = this.pMin;
    this.searchParams.precioF = this.pMax;
    this._route.navigate(['/propiedades', this.searchParams]);   
  }

  private getEstados() {
    this._globalService.getData('estados').subscribe(
      response => {
        if(response.status == 'success') {
          this.estados = response.data;
        } else {
          this.estados = new Array<string>();
        }
      }, 
      error => {}
    ); 
  }

  private getCategorias() {
    this._globalService.getData('categorias').subscribe(
      response => {
        if(response.status == 'success') {
          this.categorias = response.data;
        } else {
          this.categorias = new Array<string>();
        }
      }, 
      error => {}
    ); 
  }

  private getUbicaciones() {
    this._globalService.getData('ubicaciones').subscribe(
      response => {
        if(response.status == 'success') {
          this.ubicaciones = response.data;
        } else {
          this.ubicaciones = new Array<string>();
        }
      }, 
      error => {}
    ); 
  }

  onEstado(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.estado = value;
    }
  }

  onCategoria(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.categoria = value;
    }
  }

  onUbicacion(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.ubicacion = value;
    }
  }

  onHabitaciones(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.habitaciones = parseInt(value);
    }
  }

  onBanos(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.banos = parseInt(value);
    }
  }

  onMonedas(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.searchParams.moneda = value;
    }
  }

  private getMonedas() {
    this._globalService.getData('monedas').subscribe(
      response => {
        if(response.status == 'success') {
          this.monedas = response.data;
        } else {
          this.monedas = new Array<string>();
        }
      }, 
      error => {}
    ); 
  }

}