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
import {ImageModule} from 'primeng/image';
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
@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent, 
    PrincipalComponent, DetallelugarComponent, UbicacionlugarComponent, DetallerutaComponent,  
  
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
    LazyLoadImageModule
  ]
})
export class PagesModule { }