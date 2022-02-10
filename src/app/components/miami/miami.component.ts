import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Propiedad } from '../../models/propiedad';
import { faMapPin, faBed, faArrowsAlt, faToilet, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-miami',
  templateUrl: './miami.component.html',
  styleUrls: ['./miami.component.css'],
  providers: [GlobalService]
})
export class MiamiComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public propiedades_por_pagina = Global.propiedades_por_pagina;

  public propiedadesP!: Propiedad[];
  public paginaActual: number = 1;
  public totalPaginas: number = 1;
  
  faMapPin = faMapPin;
  faBed = faBed;
  faArrowsAlt = faArrowsAlt;
  faToilet = faToilet;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginacion();
    this.getProMiami();    
  }

  private getProMiami() {
    this._globalService.getData('pro-miami').subscribe(
      response => {
        if(response.status == 'success') {
          let propiedades = response.data;
          
          let inicio = (this.paginaActual > 1) ? this.paginaActual * this.propiedades_por_pagina - this.propiedades_por_pagina : 0;
          let fin = (inicio + this.propiedades_por_pagina);
          this.totalPaginas = Math.ceil(propiedades.length / this.propiedades_por_pagina);
          
          this.propiedadesP = propiedades.slice(inicio, fin);
        }
      },
      error => {}
    );
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
    this._router.navigate(['/miami', param]).then(() => {
      this.getProMiami();
    });
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

}
