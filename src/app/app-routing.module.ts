import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { MiamiComponent } from './components/miami/miami.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { AgentesComponent } from './components/agentes/agentes.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ProSingleComponent } from './components/pro-single/pro-single.component';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';
import { ReqPasswordComponent } from './components/req-password/req-password.component';
import { ValidarPasswordComponent } from './components/validar-password/validar-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:pv/:pa', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'miami', component: MiamiComponent },
  { path: 'miami/:p', component: MiamiComponent },
  { path: 'propiedades', component: PropiedadesComponent },
  { path: 'propiedades/:p', component: PropiedadesComponent }, 
  { path: 'agentes', component: AgentesComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'galeria/:p', component: GaleriaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'pro-single', component: ProSingleComponent },
  { path: 'pro-single/:codigo', component: ProSingleComponent },
  { path: 'validar-email', component: ValidarEmailComponent },
  { path: 'validar-email/:usuario', component: ValidarEmailComponent },
  { path: 'validar-email/:usuario/:email', component: ValidarEmailComponent },
  { path: 'req-password', component: ReqPasswordComponent },  
  { path: 'validar-password/:usuario/:token', component: ValidarPasswordComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
