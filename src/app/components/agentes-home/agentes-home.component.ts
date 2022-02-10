import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { GlobalService } from '../../services/global.service';
import { Agente } from '../../models/agente';

@Component({
  selector: 'app-agentes-home',
  templateUrl: './agentes-home.component.html',
  styleUrls: ['./agentes-home.component.css'],
  providers: [GlobalService]
})
export class AgentesHomeComponent implements OnInit {

  public _ruta = Global.ruta;
  public _data = Global.dataurl;

  public agentes!: Agente[];

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
