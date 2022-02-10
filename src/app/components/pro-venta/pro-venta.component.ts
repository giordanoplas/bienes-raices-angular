import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { faBed, faShower, faVectorSquare, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Propiedad } from '../../models/propiedad';

@Component({
  selector: 'app-pro-venta',
  templateUrl: './pro-venta.component.html',
  styleUrls: ['./pro-venta.component.css'],
  providers: [GlobalService]
})
export class ProVentaComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public propiedades_por_pagina = Global.propiedades_por_pagina_home;

  public propiedadesP!: Propiedad[];
  public paginaActual: number = 1;
  public totalPaginas: number = 1;

  faBed = faBed;
  faShower = faShower;
  faVectorSquare = faVectorSquare;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginacion();
    this.getProVentas();
  }  

  private getProVentas() {
    this._globalService.getData('pro-ventas').subscribe(
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
      let p = params.pv;
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
    this._router.navigate(['/home', param, 1]).then(() => {
      this.getProVentas();
    });
  }

}
