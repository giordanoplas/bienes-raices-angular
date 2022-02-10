import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { faUserCog, faFileContract, faChartLine, faUserTie, faBullhorn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-servicios-home',
  templateUrl: './servicios-home.component.html',
  styleUrls: ['./servicios-home.component.css']
})
export class ServiciosHomeComponent implements OnInit {

  public _ruta = Global.ruta;

  faUserCog = faUserCog;
  faFileContract = faFileContract;
  faChartLine = faChartLine;
  faUserTie = faUserTie;
  faBullhorn = faBullhorn;

  constructor() { }

  ngOnInit(): void {
  }

}
