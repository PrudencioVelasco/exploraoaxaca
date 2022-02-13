import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'lodash';
import { Actividad } from 'src/app/models/actividad.model';
import { LugarRuta } from 'src/app/models/lugar.ruta.model';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-detalleruta',
  templateUrl: './detalleruta.component.html',
  styles: [
  ]
})
export class DetallerutaComponent implements OnInit {
  idruta: Number = 0;  
  public lugaresRuta: LugarRuta[] = [];
  public actividades: Actividad[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private rutaService: RutaService
  )

   { 
    this.activeRoute.paramMap.subscribe((params) => {
      this.idruta = parseInt(params.get('id')!) || 0; 
    });
   }

  ngOnInit(): void {
    this.  obtenerLugaresRuta();
  }
  obtenerLugaresRuta() {
    this.rutaService
      .obtenerLugaresRuta({ idruta: this.idruta })
      //.pipe(delay(100))
      .subscribe({
        next: (value) => {
          this.lugaresRuta = value.data;
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