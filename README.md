# Sistema de Control de Transacciones Seguras - Orion Innovation

Este es el frontend de una aplicación web orion inc en **Angular** para la gestión y procesamiento seguro de transacciones financieras. El sistema implementa políticas de seguridad avanzadas como autenticación basada en cookies HttpOnly y el cifrado de datos sensibles en el lado del cliente (Client-Side Encryption) antes de ser transmitidos al backend.

## 🚀 Características Principales

* **Arquitectura Modern Angular (Zoneless):** Construido aprovechando al máximo la reactividad nativa con **Signals** (`signal`), eliminando la dependencia de Zone.js para una renderización más eficiente.
* **Formularios Híbridos:** Uso de `ReactiveFormsModule` para el control estricto del Login y `FormsModule` (Template-driven con Signals) para el registro dinámico de operaciones.
* **Cifrado Criptográfico End-to-End:** Cifrado del "Secreto Técnico" en el cliente utilizando el algoritmo **AES-256 en modo ECB** con padding PKCS7 (a través de `crypto-js`), garantizando compatibilidad total con descifrado `PKCS5Padding` en entornos Java.
* **Flujo de Control Moderno:** Implementación de las nuevas directivas de plantilla de Angular (`@if`) para un renderizado condicional limpio y legible.

---

## 🛠️ Requisitos del Sistema y Flujo de Datos

Para que el ecosistema funcione correctamente, el backend acoplado debe cumplir con las siguientes directrices técnicas solicitadas:

1.  **Validación de Credenciales (Bcrypt):** Las contraseñas de los usuarios deben estar almacenadas en la base de datos cifradas mediante el algoritmo **Bcrypt**.
2.  **Usuario de Prueba:** Por defecto, el sistema viene configurado para validar contra el usuario administrador base:
  * **Usuario:** `admin`
  * **Contraseña:** `admin` *(Nota: Esta debe ser insertada previamente en la BD mediante un script/query con su respectivo hash Bcrypt)*.
3.  **Seguridad de Sesión:** Tras un inicio de sesión exitoso, el backend deposita de forma automática una cookie segura `HttpOnly` en el navegador para autorizar las peticiones subsiguientes.

---

## 💻 Vista Previa de los Módulos

### 1. Ventana de Login
Pantalla inicial de acceso institucional con validaciones de campos requeridos en tiempo real.
* **Campos:** Usuario (`username`), Contraseña (`password`).
* **Comportamiento:** Si las credenciales son válidas, el estado global muta los signals `usuarioActual` y `rolesUsuario`, redirigiendo automáticamente al módulo de operaciones.

### 2. Ventana de Registrar Operación
Formulario para la captura de transacciones financieras.
* **Campos:** Operación, Importe, Cliente y Secreto Técnico.
* **Seguridad:** Al presionar "Procesar Transacción", el campo **Secreto Técnico** se cifra inmediatamente mediante AES en Base64, impidiendo que viaje en texto plano por la red.
* **Feedback:** Al recibir la respuesta de la API, el sistema despliega una notificación integrada (Alerta de éxito con número de referencia o errores específicos mapeados por campo).

---

## 🔧 Instalación y Configuración

### Prerrequisitos
* [Node.js](https://nodejs.org/) (Versión v18 o superior recomendada)
* Angular CLI instalado de forma global (`npm install -g @angular/cli`)

### Pasos para iniciar el entorno de desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/GameCore/TransaccionesSegurasOrionIncFront.git](https://github.com/GameCore/TransaccionesSegurasOrionIncFront.git)
   cd TU_REPOSITORIO
   ```
   Instalar dependencias:
   Instala los paquetes necesarios, incluyendo las librerías criptográficas:
```bash
   npm install
   ```

Variables de Entorno / Endpoints:
El proyecto apunta por defecto a los siguientes endpoints locales configurados en los servicios:

    Auth Service: http://localhost:8082/api/v1/auth

    Transacciones Service: http://localhost:8082/api/v1

    Llave de Cifrado (AES KEY): Configurada internamente a 256-bits (ecb50f256979ce6efe57da15e021dbf8).

Levantar el servidor de desarrollo:
```bash
ng serve
```
Una vez compilado, navega a http://localhost:4200/

📦 Estructura de Código Clave

El núcleo seguro del proyecto reside en el envío y blindaje de datos:

    AuthService: Gestiona el estado de autenticación de la sesión de manera reactiva mediante Signals independientes de Zone.js.

    TransaccionesService: Intercepta la petición de registro, clona la estructura de la transacción y aplica la encriptación AES:

const keyBytes = CryptoJS.enc.Utf8.parse(this.secretAES);
const cifrado = CryptoJS.AES.encrypt(
CryptoJS.enc.Utf8.parse(transaccionClonada.secreto),
keyBytes,
{ mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
);
transaccionClonada.secreto = cifrado.toString();

Diseñado con fines institucionales y de alta seguridad. 🔒

### 💡 Algunos tips extra para tu repositorio de GitHub:
**Llave secreta (`secretAES`):** Como buena práctica de producción, dejé una sección de "Endpoints" en el README para documentar que está ahí, pero recuerda.
** que en un ambiente real esa llave debería manejarse mediante variables de entorno o inyección dinámica para que no se quede estática en el código de GitHub.
**Cambiar ruta del clone:**   
