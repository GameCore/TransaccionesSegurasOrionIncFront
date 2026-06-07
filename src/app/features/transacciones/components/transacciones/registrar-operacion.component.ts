import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarOperacionRequest } from '../../../../core/models/registrar-operacion-request';
import { TransaccionesService } from '../../services/transacciones.seguras.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registrar-operacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-operacion.component.html',
  styleUrl: './registrar-operacion.component.scss'
})
export class RegistrarOperacionComponent {

  private readonly transaccionesService = inject(TransaccionesService);

  public transaccion = signal<RegistrarOperacionRequest>({
    cliente: '',
    operacion: '',
    importe: 0,
    secreto: ''
  });

  public cargando = signal<boolean>(false);
  public mensajeExito = signal<string | null>(null);
  public mensajeError = signal<string | null>(null);

  public onSubmit(): void {
    this.cargando.set(true);
    this.mensajeExito.set(null);
    this.mensajeError.set(null);

    this.transaccionesService.procesarTransaccion(this.transaccion())
      .pipe(
        finalize(() => {
          this.cargando.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Respuesta exitosa de la API 2:', response);

          this.mensajeExito.set(`Transacción aprobada con éxito. Referencia: ${response.referencia || 'N/A'}`);
          this.limpiarFormulario();
        },
        error: (err: any) => {
          console.error('Error capturado en el componente:', err);

          // 1. Si el backend nos manda un objeto con errores de validación por campo (ej. err.error.importe)
          if (err.error && typeof err.error === 'object') {
            // Si viene el error específico de 'importe', lo usamos; si no, listamos todos los errores juntos
            const mensajesDeCampos = Object.values(err.error).join(', ');
            this.mensajeError.set(mensajesDeCampos || 'Datos de formulario inválidos.');
          } else {
            // 2. Si es un error genérico (un string plano o una excepción del sistema)
            this.mensajeError.set(err.error?.message || err.error || 'Ocurrió un error al procesar la operación.');
          }
        }
      });
  }

  private limpiarFormulario(): void {
    this.transaccion.set({
      cliente: '',
      operacion: '',
      importe: 0,
      secreto: ''
    });
  }
}
