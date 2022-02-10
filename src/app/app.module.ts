import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RecaptchaModule } from "ng-recaptcha";
import { SafePipe } from './pipes/SafePipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { AgentesComponent } from './components/agentes/agentes.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ProVentaComponent } from './components/pro-venta/pro-venta.component';
import { ProAlquilerComponent } from './components/pro-alquiler/pro-alquiler.component';
import { ProDestacadasComponent } from './components/pro-destacadas/pro-destacadas.component';
import { AgentesHomeComponent } from './components/agentes-home/agentes-home.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { FooterComponent } from './components/footer/footer.component';
import { DestacadasHomeComponent } from './components/destacadas-home/destacadas-home.component';
import { ServiciosHomeComponent } from './components/servicios-home/servicios-home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { MiamiComponent } from './components/miami/miami.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';
import { ReqPasswordComponent } from './components/req-password/req-password.component';
import { ValidarPasswordComponent } from './components/validar-password/validar-password.component';
import { ProSingleComponent } from './components/pro-single/pro-single.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeComponent,
    HeaderComponent,
    PropiedadesComponent,
    AgentesComponent,
    GaleriaComponent,
    ContactoComponent,
    BuscadorComponent,
    ProVentaComponent,
    ProAlquilerComponent,
    ProDestacadasComponent,
    AgentesHomeComponent,
    CaracteristicasComponent,
    FooterComponent,
    DestacadasHomeComponent,
    ServiciosHomeComponent,
    NosotrosComponent,
    MiamiComponent,
    ValidarEmailComponent,
    ReqPasswordComponent,
    ValidarPasswordComponent,
    ProSingleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    RecaptchaModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
