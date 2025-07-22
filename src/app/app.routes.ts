import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { DetalleEstacion } from './pages/detalle-estacion/detalle-estacion';
import { HistorialAlquileresComponent } from './pages/historial-alquileres-component/historial-alquileres-component';
import { HomeComponet } from './pages/home-componet/home-componet';


export const routes: Routes = [
    { path: 'home', component: HomeComponet },
    { path: 'detalle-estacion', component: DetalleEstacion },
    { path: 'historial-alquileres', component: HistorialAlquileresComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
