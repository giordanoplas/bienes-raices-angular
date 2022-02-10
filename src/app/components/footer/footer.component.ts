import { Component, OnInit } from '@angular/core';
import { faCaretRight, faCopyright, faPhone, faMapMarkedAlt, faPhoneVolume, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Global } from '../../services/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public _ruta = Global.ruta;
  public mainEmail = Global.main_email;

  faCaretRight = faCaretRight
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebookF = faFacebookF;
  faWhatsapp = faWhatsapp;
  faCopyright = faCopyright;
  faPhone = faPhone;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhoneVolume = faPhoneVolume;
  faEnvelopeOpenText = faEnvelopeOpenText;
  

  constructor() { }

  ngOnInit(): void {
  }

}
