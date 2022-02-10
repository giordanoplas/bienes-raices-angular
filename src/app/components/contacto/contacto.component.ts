import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Contacto } from '../../models/contacto';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [GlobalService]
})
export class ContactoComponent implements OnInit {

  public estados: any;
  public categorias: any;
  public ubicaciones: any;

  public _ruta = Global.ruta;
  public contacto: Contacto;
  public captchaValidated = false;

  faPaperPlane = faPaperPlane;

  constructor(
    private _globalService: GlobalService,
  ) { 
    this.contacto = {
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
    this.getEstados();
    this.getCategorias();
    this.getUbicaciones();
  }

  onSubmit() {
    this._globalService.sendContactoEmail(this.contacto).subscribe(
      response => {
        if(response.status == 'success') {
          let usuario = window.localStorage.getItem("usuario");
          if(usuario != null) {
            let log = "Envió un correo de contacto con la siguiente información: Nombre -- "+this.contacto.nombre+". Correo -- "+this.contacto.email
              +". Teléfono -- "+this.contacto.telefono+". Estado -- "+this.contacto.estado+". Categoría -- "+this.contacto.categoria+". Ubicación -- "+this.contacto.ubicacion
              +". Lugar -- "+this.contacto.lugarExac+". Mensaje -- "+this.contacto.mensaje;  

            this._globalService.usuarioLog(usuario, log).subscribe(
              response => {},
              error => {}
            );
          }

          Swal.fire({
            title: 'Información enviada!',
            text: response.mensaje,
            icon: 'success',
            confirmButtonText: 'Cool!'
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: '505 Favor comunicarse con soporte para resolver este error...',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
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
      this.contacto.estado = value;
    }
  }

  onCategoria(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.contacto.categoria = value;
    }
  }

  onUbicacion(event: any) {
    if (event.target.value != null) {
      let value = event.target.value;
      this.contacto.ubicacion = value;
    }
  }

  resolved(captchaResponse: string) {
    this.captchaValidated = captchaResponse != null ? true : false;
  }

}
