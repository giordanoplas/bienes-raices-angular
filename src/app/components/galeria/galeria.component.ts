import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Propiedad } from '../../models/propiedad';
import { faMapPin, faBed, faArrowsAlt, faToilet, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  providers: [GlobalService]
})
export class GaleriaComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public propiedades_por_pagina = Global.propiedades_por_pagina;

  public propiedadesP!: Propiedad[];
  public propiedad!: Propiedad;
  public paginaActual: number = 1;
  public totalPaginas: number = 1;

  public modals: Array<string> = [];

  faMapPin = faMapPin;
  faBed = faBed;
  faArrowsAlt = faArrowsAlt;
  faToilet = faToilet;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modalService: NgbModal
  ) {     
    this.propiedad = new Propiedad(0, "", "", "", "", 0, 0, 0, "", "", 0, "", "", "", 0, 0, 0, 0, "", 0);
  }

  ngOnInit(): void {
    this.paginacion();
    this.getPropiedades();
  }

  galleryModal(pro: Propiedad, content: any) {
    this._modalService.open(content, { ariaLabelledBy: content, windowClass: 'modal-badge', centered: true, size: 'md' });
    this.propiedad = pro;
  }  

  closeModal() {
    if (this._modalService.hasOpenModals()) {
      this._modalService.dismissAll();
    }
  }

  private getPropiedades() {
    this._globalService.getData('propiedades').subscribe(
      response => {
        if (response.status == 'success') {
          let propiedades = response.data;

          let inicio = (this.paginaActual > 1) ? this.paginaActual * this.propiedades_por_pagina - this.propiedades_por_pagina : 0;
          let fin = (inicio + this.propiedades_por_pagina);
          this.totalPaginas = Math.ceil(propiedades.length / this.propiedades_por_pagina);

          this.propiedadesP = propiedades.slice(inicio, fin);

          this.modals = new Array<string>();
          for (let i = inicio; i < fin; i++) {
            this.modals.push('modal_' + i);
          }
        }
      },
      error => { }
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
    this._router.navigate(['/galeria', param]).then(() => {
      this.getPropiedades();
    });
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

}
