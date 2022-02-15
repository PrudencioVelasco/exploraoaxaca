import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Lugar } from '../models/lugar.model';
import { ImagenLugar } from '../models/imagen.lugar.model';
import { SitiosInteres } from '../models/sitiosinteres.model';
import { ComentarioLugar } from '../models/comentario.lugar.model';
import { Resultado } from '../models/busqueda.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})

export class LugarService {
  public lugar?: Lugar;
  constructor(private http: HttpClient) {}
  detalleLugar(data:{idlugar:Number}) {
    const url = `${base_url}/lugar/obtenerDetalleLugar`;
    return this.http.post<{success:Boolean, data: Lugar }>(url,data);
  }
  obtenerSitiosInteresLugar(data:{idlugar:Number}) {
    const url = `${base_url}/sitiosinteres/obtenerSitiosInteresPorLugarv2`;
    return this.http.post<{success:Boolean, data: SitiosInteres[] }>(url,data);
  }
  buscarCosasQueHacer(data:{valor:String}) {
    const url = `${base_url}/lugar/buscarLugaresActivos`;
    return this.http.post<{success:Boolean, data: Lugar[] }>(url,data);
  }
  obtenerSliderPrincipal() {
    const url = `${base_url}/lugar/sliderPrincipal`;
    return this.http.get<{ data: Lugar[] }>(url);
  } 
  obtenerSliderPolulares() {
    const url = `${base_url}/lugar/sliderLugaresTops`;
    return this.http.get<{ data: Lugar[] }>(url);
  } 
  obtenerLugaresRecomendados() {
    const url = `${base_url}/lugar/lugaresDentroSliders`;
    return this.http.get<{ data: Lugar[] }>(url);
  } 
  obtenerImagenesLugar(data:{idlugar:Number}) {
    const url = `${base_url}/lugar/obtenerImagenesLugar`;
    return this.http.post<{success:Boolean, data: ImagenLugar[] }>(url,data);
  }
   obtenerComentariosLugar(data:{idlugar:Number}){
    return this.http.post<{success:Boolean, data: ComentarioLugar[] }>(`${base_url}/comentario/obtenerComentariosLugarAdmin`,data);
  }
  buscarLugaresMapBox(valor:String,latitud:any,longitud:any){
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${valor}.json`;
    let params = new HttpParams();
    params = params.append('access_token', environment.mapBoxToken);
    params = params.append('autocomplete', 'true');
    params = params.append('language', 'es');
    params = params.append('limit', 10);
    params = params.append('proximity', `${longitud},${latitud}`); 

    return this.http.get<Resultado>(uri, {params: params});

  }
}
