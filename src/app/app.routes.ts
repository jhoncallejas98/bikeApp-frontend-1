import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar-component';
import { DetalleEstacionComponent } from './pages/detalle-estacion-component';
import { HistorialAlquileresComponent } from './pages/historial-alquileres-component';
import { HomeComponent } from './pages/home-component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'detalle-estacion/:id', component: DetalleEstacionComponent },
    { path: 'historial-alquileres', component: HistorialAlquileresComponent },
    { path: 'bicicletas', loadComponent: () => import('./pages/bicicletas-component/bicicletas-component').then(m => m.BicicletasComponent) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
