import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs'; 
import { ImagenesSliderPrincipal } from 'src/app/models/imagenSliderPrincipal.model';
import { Lugar } from 'src/app/models/lugar.model';
import { LugarService } from 'src/app/services/lugar.service';
import { PrimeNGConfig } from 'primeng/api';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';   
import { RutaService } from 'src/app/services/ruta.service';
import { RutaPrincipal } from 'src/app/models/ruta.principal.model';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [NgbCarouselConfig]
})

export class PrincipalComponent implements OnInit {
 
  public slidersprincipal: Lugar[]=[]; 
  public sliderspopulares: Lugar[]=[]; 
  public rutas:RutaPrincipal[]=[]; 
  public rutasvisibles:RutaPrincipal[]=[]; 
  public imagenesSliderPrincipal:ImagenesSliderPrincipal[] = [];
  responsiveOptions: any[];;
  public cargando_principal:boolean = true;
  public cargando_populares:boolean = true;
  defaultImage = './assets/images/loading.gif';
  constructor(
    private lugarService: LugarService,
    private rutaService: RutaService,
    private primengConfig: PrimeNGConfig,
    config: NgbCarouselConfig
  ) {
    config.interval = 2000;

    config.keyboard = true;

    config.pauseOnHover = true;
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit(): void {
    this.cargarImagenesSliders();
    this.cargarImagenesSlidersPopulares();
    this.cargarRutasPrincipales();
    this.cargarRutasVisibles();
    this.primengConfig.ripple = true;
  }
  cargarRutasPrincipales(){

    this.rutaService
    .obtenerRutaPrincipal()
    .pipe(delay(100))

    .subscribe({
      next: (value) => {
        this.rutas = value.data; 
  this.cargando_principal = false;
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });

  }
  cargarRutasVisibles(){

    this.rutaService
    .obtenerRutaVisibles()
    .pipe(delay(100))

    .subscribe({
      next: (value) => {
        this.rutasvisibles = value.data; 
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });

  }
  cargarImagenesSliders(){

    this.lugarService
    .obtenerSliderPrincipal()
    .pipe(delay(100))

    .subscribe({
      next: (value) => {
        this.slidersprincipal = value.data; 
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });

  }
  cargarImagenesSlidersPopulares(){

    this.lugarService
    .obtenerSliderPolulares()
    .pipe(delay(100))

    .subscribe({
      next: (value) => {
        this.sliderspopulares = value.data; 
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });

  }
  truncate(value: string, limit: number = 40, trail: String = '…'): string {
    let result = value || '';
  
    if (value) {
      const words = value.split(/\s+/);
      if (words.length > Math.abs(limit)) {
        if (limit < 0) {
          limit *= -1;
          result = trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
          result = words.slice(0, limit).join(' ') + trail;
        }
      }
    }
  
    return result;
  }
}
