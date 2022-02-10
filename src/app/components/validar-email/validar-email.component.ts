import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css'],
  providers: [GlobalService]
})
export class ValidarEmailComponent implements OnInit {

  public _ruta = Global.ruta;
  public validado: boolean;

  public usuario: any;
  public email: any;

  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.validado = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.usuario = params.usuario;
      this.email = params.email;

      if (this.usuario != null && this.email != null) {
        this._globalService.validarEmail(this.usuario, this.email).subscribe(
          response => {
            if (response.status == 'success') {
              this.validado = true;

              setTimeout(() => {
                this._router.navigate(['/home']);
              }, 5000);
            } else {
              this.validado = false;
            }
          },
          error => {
            this.validado = false;
          }
        );
      } else {
        this._router.navigate(['/home']);
      }
    });
  }

}
