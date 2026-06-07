// src/app/app.routes.ts o app-routing.module.ts
import { Routes } from '@angular/router';
import {RegistrarOperacionComponent} from './features/transacciones/components/transacciones/registrar-operacion.component';
import { LoginComponent } from './features/auth/components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // ASEGÚRATE DE QUE EL PATH SEA EXACTAMENTE 'transacciones'
  { path: 'registrar-operacion', component: RegistrarOperacionComponent },
  // Ruta comodín por si escriben cualquier otra cosa
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
