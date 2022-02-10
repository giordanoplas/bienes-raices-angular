import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Propiedad } from '../../models/propiedad';
import { faSearch, faMapPin, faBed, faArrowsAlt, faToilet, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css'],
  providers: [GlobalService]
})
export class PropiedadesComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public propiedades_por_pagina = Global.propiedades_por_pagina;

  public codigoSearch: string = '';

  public propiedadesP!: Propiedad[] | null;
  public paginaActual: number = 1;
  public totalPaginas: number = 1;

  public dataSearchEmpty: boolean = false;
  private searchParams: any;
  public searchModel: any;

  faSearch = faSearch;
  faMapPin = faMapPin;
  faBed = faBed;
  faArrowsAlt = faArrowsAlt;
  faToilet = faToilet;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  public pMin = 0;
  public pMax = 15000000;

  public precioIA: Array<number> = [];
  public precioFA: Array<number> = [];

  public estados: any;
  public categorias: any;
  public ubicaciones: any;  
  public monedas: any;  

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    for(let i = 0; i <= 1000000; i += 5000) {
      this.precioIA.push(i);
    }
    for(let i = 10000; i <= 15000000; i += 10000) {
      this.precioFA.push(i);
    }
  }

  ngOnInit(): void {    
    this.getEstados();
    this.getCategorias();
    this.getUbicaciones();
    this.getMonedas();
    this.paginacion();    

    this.fillVariables();  
  }

  private fillVariables() {
    this._route.params.subscribe((params) => {
      let estado = params.estado;
      let categoria = params.categoria;
      let ubicacion = params.ubicacion;
      let habitaciones = params.habitaciones;
      let banos = params.banos;
      let precioI = params.precioI;
      let precioF = params.precioF;
      let moneda = params.moneda;

      if(estado != null && categoria != null && ubicacion != null && habitaciones != null && banos != null && precioI != null && precioF != null && moneda != null) {
        this.searchParams = {
          estado: estado,
          categoria: categoria,
          ubicacion: ubicacion,
          habitaciones: habitaciones,
          banos: banos,
          precioI: precioI,
          precioF: precioF,
          moneda: moneda
        };
        this.searchModel = this.searchParams;       

        this._globalService.search('search-propiedades', this.searchModel).subscribe(
          response => {
            if(response.status == 'success') {
              let propiedades = response.data;
              
              let inicio = (this.paginaActual > 1) ? this.paginaActual * this.propiedades_por_pagina - this.propiedades_por_pagina : 0;
              let fin = (inicio + this.propiedades_por_pagina);
              this.totalPaginas = Math.ceil(propiedades.length / this.propiedades_por_pagina);
              
              this.propiedadesP = propiedades.slice(inicio, fin);
              
            } else {           
              this.dataSearchEmpty = true;
            }
          },
          error => {}
        );
      } else {
        this.searchModel = {
          estado: '0',
          categoria: '0',
          ubicacion: '0',
          habitaciones: '1',
          banos: '1',
          precioI: this.pMin,
          precioF: this.pMax,
          moneda: "0"
        }    

        this._globalService.getData('propiedades').subscribe(
          response => {
            if(response.status == 'success') {
              let propiedades = response.data;
              
              let inicio = (this.paginaActual > 1) ? this.paginaActual * this.propiedades_por_pagina - this.propiedades_por_pagina : 0;
              let fin = (inicio + this.propiedades_por_pagina);
              this.totalPaginas = Math.ceil(propiedades.length / this.propiedades_por_pagina);
              
              this.propiedadesP = propiedades.slice(inicio, fin);
            } else {
              this.propiedadesP = null;
            }
          },
          error => {}
        );
      }
    });
  } 

  private paginacion() {
    this._route.params.subscribe((params) => {
      let p = params.p;
      this.paginaActual = p ? p : 1;
    });
  }

  createRange(number: number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  nextPage() {
    let n = this.paginaActual;
    n++;
    return n;
  }

  prevPage() {
    let n = this.paginaActual;
    n--;
    return n;
  }

  link(param: any) {
    if(this.searchParams == null) {
      this._router.navigate(['/propiedades', param]).then(() => {              
        this.fillVariables();
      });
    } else {
      this._router.navigate(['/propiedades', param, this.searchParams]).then(() => {        
        this.fillVariables();
      });
    }
    
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

  onChange(event: any) {
    this.goSearch();
  }

  private goSearch() {
    this.propiedadesP = null;
    this._router.navigate(['/propiedades', this.searchModel]).then(() => {          
      this.fillVariables();
    });
  }

  goSearchCodigo() {    
    if(this.codigoSearch.trim() != '' && this.codigoSearch.length == 6) {
      this.propiedadesP = null;
      
      this._globalService.searchCodigo('search-propiedad-codigo', this.codigoSearch).subscribe(
        response => {
          if(response.status == 'success') {
            let propiedades = response.data;
            
            let inicio = (this.paginaActual > 1) ? this.paginaActual * this.propiedades_por_pagina - this.propiedades_por_pagina : 0;
            let fin = (inicio + this.propiedades_por_pagina);
            this.totalPaginas = Math.ceil(propiedades.length / this.propiedades_por_pagina);
            
            this.propiedadesP = propiedades.slice(inicio, fin);
          } else {
            this.propiedadesP = null;
          }
        }, 
        error => {}
      ); 
    }
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

}
