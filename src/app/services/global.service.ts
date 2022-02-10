import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class GlobalService {

    private dataurl: string;
    private loginjson: string;
    private registrojson: string;
    private sendemailjson: string;
    private validaremailjson: string;
    private recuperarpasswordjson: string;
    private cambiarpasswordjson: string;
    private datajson: string;
    private contactoemailjson: string;
    private usuariologjson: string;

    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private _http: HttpClient
    ) {
        this.dataurl = Global.dataurl;
        this.loginjson = "login_json.php";
        this.registrojson = "registrar_usuario_json.php";
        this.sendemailjson = "send_email_json.php";
        this.validaremailjson = "validar_correo_json.php";
        this.recuperarpasswordjson = "recuperar_password_json.php";
        this.cambiarpasswordjson = "cambiar_password_json.php";
        this.datajson = "data_json.php";
        this.contactoemailjson = "contacto_email_json.php";
        this.usuariologjson = "usuario_log_json.php";
    }

    getLogin(usuario: string, password: string): Observable<any> {
        let params = JSON.stringify({ "usuario": usuario, "password": password });
        return this._http.post(this.dataurl + this.loginjson, params, { headers: this.headers });
    }

    signUp(user: any): Observable<any> {
        let params = JSON.stringify(user);
        return this._http.post(this.dataurl + this.registrojson, params, { headers: this.headers });
    }

    sendEmail(to: string, subject: string, rutaValidacion: string): Observable<any> {
        return this._http.get(this.dataurl + this.sendemailjson + "?to="+to+"&subject="+subject+"&rutaValidacion="+rutaValidacion);
    }

    validarEmail(usuario: string, email: string): Observable<any> {
        let params = JSON.stringify({ "usuario": usuario, "email": email });
        return this._http.post(this.dataurl + this.validaremailjson, params, { headers: this.headers });
    }

    recuperarPassword(usuario: string): Observable<any> {
        let params = JSON.stringify({ "usuario": usuario });
        return this._http.post(this.dataurl + this.recuperarpasswordjson, params, { headers: this.headers });
    }

    cambiarPassword(usuario: string, token: number, passwordR: string): Observable<any> {
        let params = JSON.stringify({ "usuario": usuario, "token": token, "passwordR": passwordR });
        return this._http.post(this.dataurl + this.cambiarpasswordjson, params, { headers: this.headers });
    }

    getData(data: string): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data);
    }

    search(data: string, searchParams: any): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&estado="+searchParams.estado
            +"&categoria="+searchParams.categoria+"&ubicacion="+searchParams.ubicacion+"&habitaciones="+searchParams.habitaciones
            +"&banos="+searchParams.banos+"&precioI="+searchParams.precioI+"&precioF="+searchParams.precioF+"&moneda="+searchParams.moneda);
    }

    searchCodigo(data: string, codigo: string): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&codigo="+codigo);
    }

    getPropiedad(data: string, codigo: string): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&codigo="+codigo);
    }

    getAgentePropiedad(data: string, id: number): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&id="+id);
    }

    sendContactoEmail(contacto: any): Observable<any> {
        let params = JSON.stringify(contacto);
        return this._http.post(this.dataurl + this.contactoemailjson, params, { headers: this.headers });
    }

    usuarioLog(usuario: string, log: string): Observable<any> {
        let params = JSON.stringify({ "usuario": usuario, "log": log });
        return this._http.post(this.dataurl + this.usuariologjson, params, { headers: this.headers });
    }

    updateVisitas(data: string, id: number, visitas: number): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&id="+id+"&visitas="+visitas);
    }

    updateRegistros(data: string, id: number, registros: number): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&id="+id+"&registros="+registros);
    }

    updateIngresos(data: string, id: number, ingresos: number): Observable<any> {
        return this._http.get(this.dataurl + this.datajson + "?data="+data+"&id="+id+"&ingresos="+ingresos);
    }

}