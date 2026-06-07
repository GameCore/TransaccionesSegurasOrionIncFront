// src/app/features/transacciones/services/transacciones.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrarOperacionRequest } from '../../../core/models/registrar-operacion-request';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8082/api/v1';
  private readonly secretAES = 'ecb50f256979ce6efe57da15e021dbf8';

  // Tu llave de 32 caracteres (256 bits)
  procesarTransaccion(transaccion: RegistrarOperacionRequest): Observable<any> {
    const transaccionClonada = { ...transaccion };

    if (transaccionClonada.secreto) {
      // 1. Parsear la llave de string a un arreglo de bytes (WordArray)
      const keyBytes = CryptoJS.enc.Utf8.parse(this.secretAES);

      // 2. Cifrar forzando el modo ECB y Padding PKCS7 (que es compatible con PKCS5Padding de Java)
      const cifrado = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(transaccionClonada.secreto),
        keyBytes,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      // 3. Extraemos el String en Base64 puro
      transaccionClonada.secreto = cifrado.toString();
      console.log('Secreto blindado (Base64 estándar):', transaccionClonada.secreto);
    }

    return this.http.post<any>(`${this.apiUrl}/procesar`, transaccionClonada);
  }
}
