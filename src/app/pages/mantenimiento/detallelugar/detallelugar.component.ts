import {
  Component,
  OnInit, 
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
})
export class DetallelugarComponent implements OnInit {
  images!: any[];
  idlugar: Number = 0;
  public imagenesLugar:ImagenLugar[] = [];
  displayCustom!: boolean;
  public lugar!: Lugar;
  activeIndex: number = 0;
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
