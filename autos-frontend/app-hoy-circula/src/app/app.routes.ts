import { Routes } from '@angular/router';
import { PaginaPrincipal } from './pages/pagina-principal/pagina-principal';
import { FormularioVehiculo } from './pages/formulario-vehiculo/formulario-vehiculo';

export const routes: Routes = [
  { path: '', component: PaginaPrincipal },
  { path: 'formulario-vehiculo', component: FormularioVehiculo },
];
