import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Propiedad } from '../../models/propiedad';

@Component({
  selector: 'app-destacadas-home',
  templateUrl: './destacadas-home.component.html',
  styleUrls: ['./destacadas-home.component.css'],
  providers: [GlobalService, NgbCarouselConfig]
})
export class DestacadasHomeComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;

  public propiedades!: Propiedad[];

  constructor(
    private _globalService: GlobalService,
    configCarousel: NgbCarouselConfig
  ) {
    configCarousel.interval = 5000;
    configCarousel.keyboard = true;
    configCarousel.pauseOnHover = true;
    configCarousel.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.getProDestacadas();
  }

  private getProDestacadas() {
    this._globalService.getData('pro-destacadas').subscribe(
      response => {
        if(response.status == 'success') {
          this.propiedades = response.data;
        }
      },
      error => {}
    );
  }

}
