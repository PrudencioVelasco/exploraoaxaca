import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environment'; 
import { LugarRuta } from '../models/lugar.ruta.model';
import { Ruta } from '../models/ruta.model';
import { RutaPrincipal } from '../models/ruta.principal.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  public rutaprincipal?: RutaPrincipal;
  constructor(private http: HttpClient) {}
  detalleRuta(data:{idruta:Number}) {
    const url = `${base_url}/ruta/obtenerDetalleRuta`;
    return this.http.post<{success:Boolean, data: Ruta }>(url,data);
  }
  obtenerRutaPrincipal() {
    const url = `${base_url}/ruta/todasRutasVisibles`;
    return this.http.get<{ data: RutaPrincipal[] }>(url);
  }  
  obtenerRutaVisibles() {
    const url = `${base_url}/ruta/todasRutasPrincipales`;
    return this.http.get<{ data: RutaPrincipal[] }>(url);
  }  
  obtenerLugaresRuta(data:{idruta:Number}) {
  const url = `${base_url}/ruta/obtenerLugaresRuta`;
  return this.http.post<{success:Boolean, data: LugarRuta[] }>(url,data);
   // return this.http.post<{success:Boolean, data: LugarRuta[] }>(`${base_url}/ruta/obtenerLugaresRuta`,data);
  }
}
