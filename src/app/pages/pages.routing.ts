import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';  
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 
import { PrincipalComponent } from './principal/principal/principal.component';
import { DetallelugarComponent } from './mantenimiento/detallelugar/detallelugar.component';
import { UbicacionlugarComponent } from './mantenimiento/ubicacionlugar/ubicacionlugar.component';
import { DetallerutaComponent } from './mantenimiento/detalleruta/detalleruta.component';



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
            { path: 'ss', component: DashboardComponent, data: { titulo: 'Dashboard' } }, 
            
            //{ path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
            //{ path: 'lugar', component: LugarComponent, data: { titulo: 'Lugar' }},
            //{ path: 'registrar', component: RegistrarComponent, data: { titulo: 'Registrar empresa' }},
            //{ path: 'detallelugar/:id', component: DetallelugarComponent, data: { titulo: 'Detalle Lugar' }},
            //{ path: 'imagenlugar/:id', component: ImagenlugarComponent, data: { titulo: 'Imagenes del lugar' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
