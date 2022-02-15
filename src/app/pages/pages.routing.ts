import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';  
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 
import { PrincipalComponent } from './principal/principal/principal.component';
import { DetallelugarComponent } from './mantenimiento/detallelugar/detallelugar.component';
import { UbicacionlugarComponent } from './mantenimiento/ubicacionlugar/ubicacionlugar.component';
import { DetallerutaComponent } from './mantenimiento/detalleruta/detalleruta.component';
import { CosasquehacerComponent } from './buscar/cosasquehacer/cosasquehacer.component';
import { ToursComponent } from './buscar/tours/tours.component';
import { CategoriaComponent } from './buscar/categoria/categoria.component';
import { AvisoprivacidadComponent } from './mantenimiento/avisoprivacidad/avisoprivacidad.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        //canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'detallelugar/:id', component: DetallelugarComponent },
            { path: 'ubicacionlugar/:id/:tipo', component: UbicacionlugarComponent },
            { path: 'detalleruta/:id', component: DetallerutaComponent },
            { path: 'cosasquehacer', component: CosasquehacerComponent },
            { path: 'categoria', component: CategoriaComponent },
            { path: 'tours', component: ToursComponent },
            { path: 'avisoprivacidad', component: AvisoprivacidadComponent },
            { path: 'ss', component: DashboardComponent, data: { titulo: 'Dashboard' } }, 
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
