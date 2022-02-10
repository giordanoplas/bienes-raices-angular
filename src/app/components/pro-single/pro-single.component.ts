import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Propiedad } from '../../models/propiedad';
import { Agente } from '../../models/agente';
import { DomSanitizer } from '@angular/platform-browser';
import { faMapMarkedAlt, faEnvelope, faPhoneVolume, faBuilding, faCaretRight, faCaretLeft, faBed, faToilet, faVectorSquare, faFileAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pro-single',
  templateUrl: './pro-single.component.html',
  styleUrls: ['./pro-single.component.css'],
  providers: [GlobalService, NgbCarouselConfig]
})
export class ProSingleComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;
  public haveAgente = false;

  public pro!: Propiedad;
  public imagenes: any;
  public videos: any;
  public agente: Agente;
  public contacto: any;
  public captchaValidated = false;

  faMapMarkedAlt = faMapMarkedAlt;
  faEnvelope = faEnvelope;
  faPhoneVolume = faPhoneVolume;
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faBuilding = faBuilding;
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faBed = faBed;
  faToilet = faToilet;
  faVectorSquare = faVectorSquare;
  faFileAlt = faFileAlt;
  faPaperPlane = faPaperPlane;

  constructor(
    private _globalService: GlobalService,
    configCarousel: NgbCarouselConfig,
    private _router: Router,
    private _route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.agente = new Agente("", "", "", "", "", "", "", "", 0, "", "", "", "");

    configCarousel.interval = 0;
    configCarousel.keyboard = true;
    configCarousel.pauseOnHover = true;
    configCarousel.showNavigationIndicators = false;
    configCarousel.showNavigationArrows = false;
    configCarousel.animation = true;

    this.contacto = {
      codigo: '',
      nombre: '',
      email: '',
      telefono: '',
      estado: '',
      categoria: '',
      ubicacion: '',
      lugarExac: '',
      mensaje: ''
    };
  }

  ngOnInit(): void {
    this.getPropiedad();
  }

  private getPropiedad() {
    this._route.params.subscribe((params) => {
      let codigo = params.codigo;
      if (codigo != null) {
        this._globalService.getPropiedad('propiedad', codigo).subscribe(
          response => {
            if (response.status == 'success') {
              this.pro = response.data;
              this.imagenes = response.imagenes ? response.imagenes : null;
              this.videos = response.videos ? response.videos : null;

              this.getAgentePropiedad(response.data.id);
            }
          },
          error => { }
        );
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  private getAgentePropiedad(id: number) {
    this._globalService.getAgentePropiedad('agente-propiedad', id).subscribe(
      response => {
        if (response.status == 'success') {
          this.agente = response.data;
          this.haveAgente = true;
        } else {
          this.haveAgente = false;
        }
      },
      error => { }
    );
  }

  cycleToSlide(index: any) {
    let imgSelectedId = 'img-select-' + index;

    let activatedSlides = document.getElementsByClassName('carousel-item active');
    for (let i = 0; i < activatedSlides.length; i++) {
      activatedSlides.item(i)?.classList.remove('active');
    }

    const slidesActive = document.getElementsByClassName('carousel-item');
    slidesActive.item(index)!.className += " active";

    let activatedImg = document.getElementsByClassName('carousel-thumbnail__img selected');
    for (let i = 0; i < activatedImg.length; i++) {
      activatedImg.item(i)?.classList.remove('selected');
    }

    const imgSelected = document.getElementById(imgSelectedId);
    imgSelected!.className += " selected";
  }

  move(position: string) {
    //var step = 50;
    switch (position) {
      case 'left':
        let element = document.getElementById('element');
        //let y = element!.offsetLeft - step;
        element!.style.transform = 'translateX(0%)';
        break;
      case 'right':
        let element2 = document.getElementById('element');
        //let y2 = element2!.offsetLeft + step;
        element2!.style.transform = 'translateX(-100%)';
        break;
    }
  }

  onSubmit() {
    if (this.pro != null) {
      this.contacto.codigo = this.pro.codigo;
      this.contacto.estado = this.pro.estado;
      this.contacto.categoria = this.pro.categoria;
      this.contacto.ubicacion = this.pro.ubicacion;

      this._globalService.sendContactoEmail(this.contacto).subscribe(
        response => {
          if (response.status == 'success') {
            let usuario = window.localStorage.getItem("usuario");
            if (usuario != null) {
              let log = "Envió un correo de contacto con la siguiente información: Código -- " + this.contacto.codigo + ". Nombre -- " + this.contacto.nombre + ". Correo -- " + this.contacto.email
                + ". Teléfono -- " + this.contacto.telefono + ". Estado -- " + this.contacto.estado + ". Categoría -- " + this.contacto.categoria + ". Ubicación -- " + this.contacto.ubicacion
                + ". Lugar -- " + this.contacto.lugarExac + ". Mensaje -- " + this.contacto.mensaje;

              this._globalService.usuarioLog(usuario, log).subscribe(
                response => { },
                error => { }
              );
            }

            this.contacto = {
              codigo: '',
              nombre: '',
              email: '',
              telefono: '',
              estado: '',
              categoria: '',
              ubicacion: '',
              lugarExac: '',
              mensaje: ''
            };

            Swal.fire({
              title: 'Información enviada!',
              text: response.mensaje,
              icon: 'success',
              confirmButtonText: 'Cool!'
            });
          }
        },
        error => { }
      );
    }
  }

  resolved(captchaResponse: string) {
    this.captchaValidated = captchaResponse != null ? true : false;
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  onKeyDownHandler(event: any) {
    var codigo = event.which || event.keyCode;

    if (codigo === 39) {
      console.log("DERECHA");
    } else if (codigo === 37) {
      console.log("IZQUIERDA");
    } else {
      console.log(codigo);
    }
  }

  //(keydown)="onKeyDownHandler($event)"
}
