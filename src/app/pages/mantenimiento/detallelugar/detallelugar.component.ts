import {
  Component,
  OnInit, ViewEncapsulation,ViewChild 
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galleria } from 'primeng/galleria';
import { delay } from 'rxjs';
import { Actividad } from 'src/app/models/actividad.model';
import { ComentarioLugar } from 'src/app/models/comentario.lugar.model';
import { ImageneslugarComentario } from 'src/app/models/imagen.comentario.lugar.model';
import { ImagenLugar } from 'src/app/models/imagen.lugar.model';
import { Lugar } from 'src/app/models/lugar.model';
import { SitiosInteres } from 'src/app/models/sitiosinteres.model';
import { LugarService } from 'src/app/services/lugar.service'; 

@Component({
  selector: 'app-detallelugar',
  templateUrl: './detallelugar.component.html',
  styleUrls: ['./detallelugar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetallelugarComponent implements OnInit {
  images!: any[];

  showThumbnails!: boolean;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  @ViewChild('galleria') galleria!: Galleria;
  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  responsiveOptions2:any[] = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
 
 

  idlugar: Number = 0;
  public imagenesLugar:ImagenLugar[] = [];
  displayCustom!: boolean;
  public lugar!: Lugar; 
  public actividades: Actividad[] = [];
  public sitiosInteresLugar: SitiosInteres[] = []; 
  public comentariosLugar:ComentarioLugar[] = [];
  public imagenesComentario:ImageneslugarComentario[]=[];
  public page = 1;
  public totalComentatio!:Number;
  
  constructor(private activeRoute: ActivatedRoute,
    private lugarService: LugarService,) {
    this.activeRoute.paramMap.subscribe((params) => {
      this.idlugar = parseInt(params.get('id')!) || 0;
    });
  }

  ngOnInit(): void {
    this.obtenerImagenesLugar();
    this.obtenerDetalleLugar();
    this.obtenerSitiosInteres();
    this.obtenerComentariosLugar();
  }
 
  
  
imageClick(index: number) {
  this.activeIndex = index;
  this.displayCustom = true;
}
  obtenerImagenesLugar(){
    this.lugarService
    .obtenerImagenesLugar({ idlugar: this.idlugar })
    .pipe(delay(100))
    .subscribe({
      next: (value) => {
        this.imagenesLugar = value.data; 
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
  obtenerComentariosLugar(){
    this.lugarService
    .obtenerComentariosLugar({ idlugar: this.idlugar })
    .pipe(delay(100))
    .subscribe({
      next: (value) => {
        this.comentariosLugar = value.data; 
        console.log(value.data);
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
  obtenerSitiosInteres(){
    this.lugarService
    .obtenerSitiosInteresLugar({ idlugar: this.idlugar })
    .pipe(delay(100))
    .subscribe({
      next: (value) => {
        this.sitiosInteresLugar = value.data; 
       // console.log(value.data);
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
  obtenerDetalleLugar(){
    this.lugarService
    .detalleLugar({ idlugar: this.idlugar })
    .pipe(delay(100))
    .subscribe({
      next: (value) => {
        this.lugar = value.data;  
      },
      error: (error) => {
        //Swal.fire('Error', error.error.message, 'error');
      },
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
  } 
  hack(val: any) {
    let str: string = val;
    this.actividades = JSON.parse(str);
    return this.actividades;
  }
  conertir_imagen_comentario(val: any) {
    let str: string = val;
    this.imagenesComentario = JSON.parse(str);
    return this.imagenesComentario;
  }
}
