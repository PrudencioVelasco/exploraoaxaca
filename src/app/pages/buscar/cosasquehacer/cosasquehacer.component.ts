import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { delay } from 'rxjs';
import { Actividad } from 'src/app/models/actividad.model';
import { Lugar } from 'src/app/models/lugar.model';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-cosasquehacer',
  templateUrl: './cosasquehacer.component.html',
  styles: [],
})
export class CosasquehacerComponent implements OnInit {
  public lugares: Lugar[] = [];
  defaultImage = './assets/images/loading.gif';
  mostrar_recomandado: boolean = true;
  mostrar_busqueda: boolean = false;
  encontro_resultado:boolean = false;
  presiono_boton:boolean = false;
  cargando:boolean=false;
  valor_buscar: string = '';
  public lugares_encontrados: Lugar[] = [];
  mapbox = mapboxgl as typeof mapboxgl;
  mapa!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  zoom = 13;
  public actividades: Actividad[] = [];
  constructor(private lugarService: LugarService) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit(): void {
    this.obtenerLugaresRecomendados();
    this.mostrar_recomandado = true;
  }
  btnBuscar() {
    if (this.valor_buscar != '') {
      this.presiono_boton = true;
      this.mostrar_recomandado =false; 
      this.cargando = true;
      this.lugarService
        .buscarCosasQueHacer({ valor: this.valor_buscar })
        .pipe(delay(100))
        .subscribe({
          next: (value) => {
            this.lugares_encontrados = value.data;  
            this.cargando = false;
            if (this.lugares_encontrados.length > 0) {
              this.builMap(
                this.lugares_encontrados[0].latitud,
                this.lugares_encontrados[0].longitud
              );
              this.lugares_encontrados.forEach((element) => { 
                const description = element.nombre;
    
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                  description.toString()
                );
    
                const marker = new mapboxgl.Marker({
                  color: '#e81010',
                  draggable: false,
                })
                  .setLngLat([
                    Number(element.longitud),
                    Number(element.latitud),
                  ])
                  .setPopup(popup)
                  .addTo(this.mapa);
              });
            }
          },
          error: (error) => {
            //Swal.fire('Error', error.error.message, 'error');
          },
        });
    }else{ 
      this.lugares_encontrados = [];
      this.presiono_boton = false;
      this.mostrar_recomandado =true; 
    }
  }
  obtenerLugaresRecomendados() {
    this.lugarService
      .obtenerLugaresRecomendados()
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          this.lugares = value.data;
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }
  builMap(latitud: any, longitud: any) {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud],
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(new mapboxgl.FullscreenControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
  hack(val: any) {
    let str: string = val;
    this.actividades = JSON.parse(str);
    return this.actividades;
  }
}
