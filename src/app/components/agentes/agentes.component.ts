import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Agente } from '../../models/agente';

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css'],
  providers: [GlobalService]
})
export class AgentesComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;

  public agentes!: Agente[];

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor(
    private _globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getAgentes();
  }

  private getAgentes() {
    this._globalService.getData('agentes').subscribe(
      response => {
        if(response.status == 'success') {
          this.agentes = response.data;
        }      
      },
      error => {}
    );
  }

}
