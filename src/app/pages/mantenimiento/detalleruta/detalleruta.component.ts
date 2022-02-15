import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { delay } from 'rxjs';
import { Actividad } from 'src/app/models/actividad.model';
import { LugarRuta } from 'src/app/models/lugar.ruta.model';
import { Ruta } from 'src/app/models/ruta.model';
import { RutaService } from 'src/app/services/ruta.service';
import { environment } from '@env/environment';
@Component({
  selector: 'app-detalleruta',
  templateUrl: './detalleruta.component.html',
  styleUrls: ['./detalleruta.component.scss'],
})
export class DetallerutaComponent implements OnInit {
  idruta: Number = 0;  
  public lugaresRuta: LugarRuta[] = [];
  public detalleRuta!: Ruta;
  public actividades: Actividad[] = [];
  mapbox = mapboxgl as typeof mapboxgl;
  map_ruta!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  zoom = 10;
  defaultImage = './assets/images/loading.gif';
  constructor(
    private activeRoute: ActivatedRoute,
    private rutaService: RutaService
  )

   { 
    this.activeRoute.paramMap.subscribe((params) => {
      this.idruta = parseInt(params.get('id')!) || 0; 
    });
    this.mapbox.accessToken = environment.mapBoxToken;
   }

  ngOnInit(): void {
    this.obtenerLugaresRuta();
    this.obtenerDetalleRuta();
  }

  obtenerLugaresRuta() {
    this.rutaService
      .obtenerLugaresRuta({ idruta: this.idruta })
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          this.lugaresRuta = value.data;
          console.log(value.data);
          this.builMapaRuta(this.lugaresRuta[0].latitud,this.lugaresRuta[0].longitud);
          this.lugaresRuta.forEach((element) => { 
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
              .addTo(this.map_ruta);
          });
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }
  builMapaRuta(latitud: any, longitud: any) {
    this.map_ruta = new mapboxgl.Map({
      container: 'map_ruta',
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud],
    });
    this.map_ruta.addControl(new mapboxgl.NavigationControl());
    this.map_ruta.addControl(new mapboxgl.FullscreenControl());
    this.map_ruta.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
 

  obtenerDetalleRuta(){
    this.rutaService
    .detalleRuta({ idruta: this.idruta })
    .pipe(delay(100))
    .subscribe({
      next: (value) => {
        this.detalleRuta = value.data; 
        console.log(value.data); 
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
  hack(val: any) {
    let str: string = val;
    this.actividades = JSON.parse(str);
    return this.actividades;
  }
}