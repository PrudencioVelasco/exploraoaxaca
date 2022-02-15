import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// Modulos
import { SharedModule } from '../shared/shared.module'; 
import { PagesComponent } from './pages.component';  
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal/principal.component';  
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';  
import {RatingModule} from 'primeng/rating';
import {GalleriaModule} from 'primeng/galleria'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetallelugarComponent } from './mantenimiento/detallelugar/detallelugar.component';
import { ChipModule } from 'primeng/chip'; 
import {AngReadmoreModule} from 'ang-readmore' 
import { NgxPaginationModule } from 'ngx-pagination';
import {SkeletonModule} from 'primeng/skeleton'; 
import { UbicacionlugarComponent } from './mantenimiento/ubicacionlugar/ubicacionlugar.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DetallerutaComponent } from './mantenimiento/detalleruta/detalleruta.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CosasquehacerComponent } from './buscar/cosasquehacer/cosasquehacer.component';
import { CategoriaComponent } from './buscar/categoria/categoria.component';
import { ToursComponent } from './buscar/tours/tours.component';
import { AvisoprivacidadComponent } from './mantenimiento/avisoprivacidad/avisoprivacidad.component'; 
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent, 
    PrincipalComponent, DetallelugarComponent, UbicacionlugarComponent, DetallerutaComponent, CosasquehacerComponent, CategoriaComponent, ToursComponent, AvisoprivacidadComponent,  
  
  ],
  exports: [
    DashboardComponent, 
    PagesComponent, 
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,   
    CommonModule, 
    CarouselModule,
    ButtonModule,
    ToastModule,
    TabViewModule, 
    ImageModule,
    RatingModule,
    NgbModule,
    GalleriaModule,
    ChipModule, 
    AngReadmoreModule,
    NgxPaginationModule, 
    SkeletonModule,
    NgxMapboxGLModule,
    LazyLoadImageModule,
    ImageModule,
    
  ]
})
export class PagesModule { }