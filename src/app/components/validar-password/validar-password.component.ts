import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar-password',
  templateUrl: './validar-password.component.html',
  styleUrls: ['./validar-password.component.css'],
  providers: [GlobalService]
})
export class ValidarPasswordComponent implements OnInit {

  public _ruta = Global.ruta;

  public passString: string;
  public passRString: string;

  public error: boolean;
  public passValid: boolean;

  faPencilAlt = faPencilAlt;

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
      this.passString = "";
      this.passRString = "";
  
      this.error = false;
      this.passValid = true;
  } 

  ngOnInit(): void {
  }

  goCambiarPassword() {
    this.cambiarPass();
  }

  private cambiarPass() {
    this._route.params.subscribe((params) => {
      let usuario = params.usuario;
      let token = params.token;

      if(usuario != null && token != null) {
        this._globalService.cambiarPassword(usuario, token, this.passString).subscribe(
          response => {
            if(response.status == 'success') {
              Swal.fire({
                title: 'Cambiado!',
                text: response.mensaje,
                icon: 'success',
                confirmButtonText: 'Cool!!'
              }).then(() => {
                  this._router.navigate(['/home'])
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
              text: '505 Por favor informe de este error al soporte técnico.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
      } else {
        this._router.navigate(['/home']);
      }      
    });
    
  }

  onTextChangePass(event: any) {
    if (this.passString != this.passRString) {
      this.passValid = false;
    } else {
      this.passValid = true;
    }
  }

}
