import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-req-password',
  templateUrl: './req-password.component.html',
  styleUrls: ['./req-password.component.css'],
  providers: [GlobalService]
})
export class ReqPasswordComponent implements OnInit {

  public _ruta = Global.ruta;

  public userString: string;
  public reqError: boolean;

  faPaperPlane = faPaperPlane;

  constructor(
    private _globalService: GlobalService,
    private _router: Router
  ) { 
    this.userString = "";
    this.reqError = false;
  }

  ngOnInit(): void {
  }

  goReq() {
    this.reqPass();
  }

  private reqPass() {
    this._globalService.recuperarPassword(this.userString).subscribe(
      response => {
        if(response.status == 'success') {
          Swal.fire({
            title: 'Correo enviado!',
            text: "Se te ha enviado un correo para que puedas cambiar la contraseña...",
            icon: 'success',
            confirmButtonText: 'Cool!!'
          }).then(() => {
            this._router.navigate(['/home']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.mensaje,
            icon: 'error',
            confirmButtonText: 'Ok!'
          });
        }
      }, 
      error => {
        Swal.fire({
          title: 'Error!',
          text: "505 Por favor contacta al soporte técnico para resolver este error...",
          icon: 'error',
          confirmButtonText: 'Ok!'
        });
      }
    );
  }

}
