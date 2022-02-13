import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
import { LugarService } from 'src/app/services/lugar.service';
import { delay } from 'rxjs';
import { Lugar } from 'src/app/models/lugar.model';
import { ComentarioLugar } from 'src/app/models/comentario.lugar.model';
import { ImageneslugarComentario } from 'src/app/models/imagen.comentario.lugar.model';
import { Resultado } from 'src/app/models/busqueda.model';
@Component({
  selector: 'app-ubicacionlugar',
  templateUrl: './ubicacionlugar.component.html',
  styleUrls: ['./ubicacionlugar.component.css'],
})
export class UbicacionlugarComponent implements OnInit {
  mapbox = mapboxgl as typeof mapboxgl;
  map!: mapboxgl.Map;
  mapa_hoteles!: mapboxgl.Map;
  mapa_restaurantes!: mapboxgl.Map;
  hoteles_cercanos!: Resultado;
  restaurantes_cercanos!: Resultado;
  style = `mapbox://styles/mapbox/streets-v11`;
  zoom = 15;
  tipobusqueda: String = '';
  idlugar: Number = 0;
  public lugar!: Lugar;
  public comentariosLugar: ComentarioLugar[] = [];
  public imagenesComentario: ImageneslugarComentario[] = [];
  public page = 1;
  public totalComentatio!: Number;
  public visibleubicacion: boolean = false;
  public visiblehotel: boolean = false;
  public visiblerestaurante: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private lugarService: LugarService
  ) {
    this.activeRoute.paramMap.subscribe((params) => {
      this.idlugar = parseInt(params.get('id')!) || 0;
      this.tipobusqueda = params.get('tipo') || '';
    });
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit(): void {
    this.obtenerDetalleLugar();
    this.obtenerComentariosLugar();
    this.validarActivo();
  }
  validarActivo() {
    if (this.tipobusqueda == 'ubicacion') {
      this.mostrarUbicacion();
    } else if (this.tipobusqueda == 'restaurante') {
      this.mostrarRestaurante();
    } else if (this.tipobusqueda == 'hotel') {
      this.mostrarHotel();
    } else {
      this.mostrarUbicacion();
    }
  }
  mostrarUbicacion() {
    this.visibleubicacion = true;
    this.visiblehotel = false;
    this.visiblerestaurante = false;
  }
  mostrarHotel() {
    this.visibleubicacion = false;
    this.visiblehotel = true;
    this.visiblerestaurante = false;
  }
  mostrarRestaurante() {
    this.visibleubicacion = false;
    this.visiblehotel = false;
    this.visiblerestaurante = true;
  }

  obtenerHotelesCercanos(latitud: any, longitud: any) {
    this.lugarService
      .buscarLugaresMapBox('hotel', latitud, longitud)
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          console.log('IMPRIMIENDO AQUI');
          this.hoteles_cercanos = value;
          console.log(this.hoteles_cercanos);
          this.hoteles_cercanos.features.forEach((element) => {
            console.log(element.geometry.coordinates);

            const description = element.place_name;

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              description
            );

            const marker = new mapboxgl.Marker({
              color: '#e81010',
              draggable: false,
            })
              .setLngLat([
                element.geometry.coordinates[0],
                element.geometry.coordinates[1],
              ])
              .setPopup(popup)
              .addTo(this.mapa_hoteles);
          });
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }
  obtenerRestaurantesCercanos(latitud: any, longitud: any) {
    this.lugarService
      .buscarLugaresMapBox('restaurante', latitud, longitud)
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          console.log('IMPRIMIENDO AQUI');
          this.restaurantes_cercanos = value;
          this.restaurantes_cercanos.features.forEach((element) => {
            console.log(element.geometry.coordinates);

            const description = element.place_name;

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              description
            );

            const marker = new mapboxgl.Marker({
              color: '#e81010',
              draggable: false,
            })
              .setLngLat([
                element.geometry.coordinates[0],
                element.geometry.coordinates[1],
              ])
              .setPopup(popup)
              .addTo(this.mapa_restaurantes);
          });
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }
  obtenerDetalleLugar() {
    this.lugarService
      .detalleLugar({ idlugar: this.idlugar })
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          this.lugar = value.data;
          this.buildMap(this.lugar.latitud, this.lugar.longitud);
          this.builMapHotel(this.lugar.latitud, this.lugar.longitud);
          this.builMapRestaurante(this.lugar.latitud, this.lugar.longitud);
          this.obtenerHotelesCercanos(this.lugar.latitud, this.lugar.longitud);
          this.obtenerRestaurantesCercanos(
            this.lugar.latitud,
            this.lugar.longitud
          );
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }
  builMapHotel(latitud: any, longitud: any) {
    this.mapa_hoteles = new mapboxgl.Map({
      container: 'mapa_hoteles',
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud],
    });
    this.mapa_hoteles.addControl(new mapboxgl.NavigationControl());
    this.mapa_hoteles.addControl(new mapboxgl.FullscreenControl());
    this.mapa_hoteles.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
  builMapRestaurante(latitud: any, longitud: any) {
    this.mapa_restaurantes = new mapboxgl.Map({
      container: 'mapa_restaurantes',
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud],
    });
    this.mapa_restaurantes.addControl(new mapboxgl.NavigationControl());
    this.mapa_restaurantes.addControl(new mapboxgl.FullscreenControl());
    this.mapa_restaurantes.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
  buildMap(latitud: any, longitud: any) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud],
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    const marker = new mapboxgl.Marker({
      color: '#e81010',
      draggable: false,
    })
      .setLngLat([longitud, latitud])
      .addTo(this.map);
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  obtenerComentariosLugar() {
    this.lugarService
      .obtenerComentariosLugar({ idlugar: this.idlugar })
      .pipe(delay(100))
      .subscribe({
        next: (value) => {
          this.comentariosLugar = value.data;
        },
        error: (error) => {
          //Swal.fire('Error', error.error.message, 'error');
        },
      });
  }

  conertir_imagen_comentario(val: any) {
    let str: string = val;
    this.imagenesComentario = JSON.parse(str);
    return this.imagenesComentario;
  }
}
