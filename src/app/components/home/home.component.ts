import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { faAsterisk, faTty } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GlobalService, NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public mainEmail = Global.main_email;

  faAsterisk = faAsterisk;
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;
  faTty = faTty;

  //images = [700, 10, 807].map((n) => `https://picsum.photos/id/${n}/1500/850`);
  public sliderImages!: Array<string>;

  constructor(
    private _globalService: GlobalService,
    configCarousel: NgbCarouselConfig,
    private _router: Router
  ) { 
    configCarousel.interval = 5000;
    configCarousel.keyboard = true;
    configCarousel.pauseOnHover = true;
    configCarousel.showNavigationIndicators = false;

    this.updateVisitas();
  }

  ngOnInit(): void {
    this.getSliders();
  }

  goContactos() {
    this._router.navigate(['/contacto']);
  }

  goPropiedades() {
    this._router.navigate(['/propiedades']);
  }

  private getSliders() {
    this._globalService.getData('sliders').subscribe(
      response => {
        if(response.status == 'success') {
          this.sliderImages = response.data;
        }
      },
      error => {}
    );
  } 

  private updateVisitas() {
    this._globalService.getData('estadisticas').subscribe(
      response => {
        if(response.status == 'success') {
          let id = parseInt(response.data.id)
          let visitas = parseInt(response.data.visitas);
          visitas++;

          this._globalService.updateVisitas('update-visitas', id, visitas).subscribe();
        }
      },
      error => {}
    );
  }

}
