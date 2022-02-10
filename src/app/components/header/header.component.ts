import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faBars, faHome, faUserTie, faFlagUsa, faBuilding, faImages, faPager, faIdCardAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../models/usuario';
import { GlobalService } from '../../services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [GlobalService]
})
export class HeaderComponent implements OnInit {

  public _ruta = Global.ruta;

  public userLogin!: string | null;
  public nameLogin!: string | null;
  public activadoLogin: boolean = false;

  public userString: string;
  public passString: string;
  public usuario!: Usuario;
  public loginError: boolean;

  public nombreString: string;
  public userRegString: string;
  public passRegString: string;
  public passRepetirString: string;
  public emailString: string;
  public telefonoString: string;
  public activado: boolean = false;
  public progress: boolean = false;

  public errorMsn: string;

  public registroError: boolean;
  public passValid: boolean;
  public emailValid: boolean;

  faBars = faBars;
  faHome = faHome;
  faUserTie = faUserTie;
  faFlagUsa = faFlagUsa;
  faBuilding = faBuilding;
  faImages = faImages;
  faPager = faPager;
  faIdCardAlt = faIdCardAlt;
  faUserFriends = faUserFriends;

  constructor(
    private _modalService: NgbModal,
    private _globalService: GlobalService,
    private _router: Router
  ) {
    this.userString = "";
    this.passString = "";
    this.loginError = false;

    this.nombreString = "";
    this.userRegString = "";
    this.passRegString = "";
    this.passRepetirString = "";
    this.emailString = "";
    this.telefonoString = "";

    this.errorMsn = "";

    this.registroError = false;
    this.passValid = true;
    this.emailValid = true;
  }

  ngOnInit(): void {
    this.userLogin = window.localStorage.getItem('usuario');
    this.nameLogin = window.localStorage.getItem('nombre');
    this.activadoLogin = window.localStorage.getItem('activado') == "1" ? true : false;
  }

  loginModal(content: any) {
    this._modalService.open(content, { ariaLabelledBy: content, windowClass: 'modal-animation2', centered: true, size: 'md' });
  }

  registroModal(content: any) {
    this._modalService.open(content, { ariaLabelledBy: content, windowClass: 'modal-animation', centered: true, size: 'md' });
  }

  closeModal(event: any) {
    if (event != null)
      event.preventDefault();

    if (this._modalService.hasOpenModals()) {
      this._modalService.dismissAll();
    }
  }

  goLogin() {
    this.login();
  }

  goRegistro() {
    this.registrar();
  }

  private login() {
    this.progress = true;

    this._globalService.getLogin(this.userString, this.passString).subscribe(
      response => {
        if (response.status == "success" && response.usuario) {
          this.usuario = response.usuario;
          window.localStorage.setItem("usuario", this.usuario.usuario);
          window.localStorage.setItem("nombre", this.usuario.nombre);
          window.localStorage.setItem("email", this.usuario.email);
          window.localStorage.setItem("activado", String(this.usuario.activado));

          this.userLogin = window.localStorage.getItem('usuario');
          this.nameLogin = window.localStorage.getItem('nombre');
          this.activadoLogin = window.localStorage.getItem('activado') == "1" ? true : false;

          if (this.activadoLogin) {
            this._globalService.getData('estadisticas').subscribe(
              response => {
                if (response.status == 'success') {
                  let id = parseInt(response.data.id)
                  let ingresos = parseInt(response.data.ingresos);
                  ingresos++;

                  this._globalService.updateIngresos('update-ingresos', id, ingresos).subscribe();
                }
              },
              error => { }
            );
          }

          this.progress = false;

          this.closeModal(null);
        } else {
          this.progress = false;

          Swal.fire({
            title: 'Error!',
            text: response.mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error => {
        this.progress = false;

        Swal.fire({
          title: 'Error!',
          text: '505 Favor comunicarse con soporte para resolver este error...',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    )
  }

  private registrar() {
    this.progress = true;

    this.usuario = {
      nombre: this.nombreString,
      usuario: this.userRegString,
      password: this.passRegString,
      email: this.emailString,
      telefono: this.telefonoString,
      activado: null
    }
    this._globalService.signUp(this.usuario).subscribe(
      response => {
        if (response.status == 'success') {
          let parametrosValidacion = this.usuario.usuario + '/' + this.usuario.email;
          this._globalService.sendEmail(this.emailString, "Tu Inmueble Perfecto correo de validación", parametrosValidacion).subscribe(
            response => {
              if (response.status == 'success') {
                this.progress = false;

                this._globalService.getData('estadisticas').subscribe(
                  response => {
                    if (response.status == 'success') {
                      let id = parseInt(response.data.id)
                      let registros = parseInt(response.data.registros);
                      registros++;

                      this._globalService.updateRegistros('update-registros', id, registros).subscribe();
                    }
                  },
                  error => { }
                );

                Swal.fire({
                  title: 'Registrado!',
                  text: 'Usuario registrado satisfactoriamente. Recibirás un correo para validación...',
                  icon: 'success',
                  confirmButtonText: 'Cool!!!'
                }).then(() => {
                  this.closeModal(null);
                });
              } else {
                this.progress = false;

                Swal.fire({
                  title: 'Error!',
                  text: response.mensaje,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            }
          );
        } else {
          this.progress = false;

          Swal.fire({
            title: 'Error!',
            text: response.mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error => {
        this.progress = false;

        Swal.fire({
          title: 'Error!',
          text: '505 Favor comunicarse con soporte para resolver este error...',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  cerrarSesion() {
    window.localStorage.clear();
    this.userLogin = null;
    this.nameLogin = null;
    this.activadoLogin = false;
  }

  onTextChangeEmail(event: any) {
    if (this.emailString.length > 0 && event.target.value != null) {
      this.emailValid = this.emailIsValid(event.target.value);
    } else {
      this.emailValid = true;
    }
  }

  private emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onTextChangePass(event: any) {
    if (this.passRegString != this.passRepetirString) {
      this.passValid = false;
    } else {
      this.passValid = true;
    }
  }

  fondoEnlaceClick(event: any) {
    var fondoEnlace = document.getElementById('fondo-enlace');
    var barraLateral = document.getElementById('barra-lateral-izquierda')

    fondoEnlace?.classList.remove('active');
    barraLateral?.classList.remove('active');

    event.preventDefault();
  }

  menuIconClick(event: any) {
    var fondoEnlace = document.getElementById('fondo-enlace');
    var barraLateral = document.getElementById('barra-lateral-izquierda')

    fondoEnlace?.classList.add('active');
    barraLateral?.classList.add('active');

    event.preventDefault();
  }

  reqPass(event: any) {
    if (event != null)
      event.preventDefault();

    this._router.navigate(['/req-password'])
      .then(() => {
        this.closeModal(null);
      });
  }

}
