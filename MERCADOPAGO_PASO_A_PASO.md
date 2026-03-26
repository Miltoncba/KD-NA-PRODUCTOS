# 🔐 CONFIGURAR MERCADOPAGO: GUÍA PASO A PASO

## DECISIÓN: ¿Por qué MercadoPago?

### MercadoPago vs Alternativas

| Feature              | MercadoPago      | Stripe          | PayPal            |
| -------------------- | ---------------- | --------------- | ----------------- |
| **Para Colombia**    | ✅ Nativo        | ❌ Requiere USD | ❌ Menos adaptado |
| **Comisión**         | 2.9% + IVA       | 2.9% + $0.30    | 3.49% + $0.30     |
| **Depósito**         | 1-3 días         | 2-3 días        | 3-5 días          |
| **Clientes locales** | ✅ Familiarizado | ❌ Menos común  | ⚠️ Conocido       |
| **Soporte ES**       | ✅ Sí            | ❌ Inglés       | ⚠️ Limitado       |
| **Facilidad**        | ⭐⭐⭐⭐⭐       | ⭐⭐⭐          | ⭐⭐⭐            |

**RECOMENDACIÓN: MercadoPago es la mejor opción para ti.**

---

## PREREQUISITOS

Necesitas tener:

- ✅ Email de acceso
- ✅ Cédula de ciudadanía (CC)
- ✅ Número de teléfono (+57)
- ✅ Domicilio en Colombia
- ✅ Cuenta bancaria colombiana

---

## 🚀 INICIO RÁPIDO (15 MINUTOS)

### MINUTO 1-2: Ir a MercadoPago

1. Abre: https://www.mercadopago.com.co/
2. Haz clic en **"Crear Cuenta"** o **"Vender en Mercado Pago"**
3. Verás 2 opciones:
   - "Soy comprador" → NO, continúa
   - "Vendo bienes o servicios" → SÍ, selecciona esto

### MINUTO 3-5: Registro básico

Completa el formulario:

```
Nombre:              Tu nombre completo
Email:               Tu email activo
Teléfono:            +57 300 123 4567
Contraseña:          Crea una segura (8+ caracteres)
Confirmar:           Repite contraseña
```

Haz clic en **"Crear Cuenta"**

### MINUTO 6-10: Verificación de email

1. Ve a tu email (bandeja de entrada)
2. Busca email de MercadoPago titulado: "Confirma tu cuenta"
3. Haz clic en "Confirmar correo electrónico"
4. Se abre MercadoPago dashboard
5. ¡Ya tienes acceso!

### MINUTO 11-13: Datos bancarios

1. En el dashboard, busca menú izquierdo
2. Haz clic en **"Configuración"**
3. Selecciona **"Datos Bancarios"** o **"Información Bancaria"**
4. Haz clic en **"Agregar cuenta"**

Completa:

```
Banco:              Bancolombia (o el tuyo)
Número de cuenta:   Tu número (generalmente 10-11 dígitos)
Dígito verificador: Último dígito (si aplica)
Tipo de cuenta:     Corriente (o Ahorros)
Nombre del titular: Tu nombre completo
```

Haz clic en **"Guardar"**

### MINUTO 14-15: Obtener API Key

1. En el dashboard, busca **"Desarrolladores"** o **"Developers"**
2. Haz clic en **"Credenciales"**
3. Verás "Modo Testing" y "Modo Producción"
4. Selecciona **"Modo Producción"**
5. Copia esta información:
   - **Public Key**: `APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Access Token**: `APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Guarda este Public Key, lo necesitarás después.**

---

## 📋 PASO A PASO DETALLADO

### PASO 1: Crear cuenta (5 minutos)

#### Opción A: Con email y contraseña

```
1. Ve a mercadopago.com.co
2. Clic en "Crear Cuenta"
3. Selecciona: "Vendo bienes o servicios"
4. Email: tu_email@gmail.com
5. Contraseña: MiPassword123!
6. Clic "Crear Cuenta"
7. Confirma el email (ve a tu bandeja)
8. ¡Listo!
```

#### Opción B: Con Facebook/Google

```
1. Ve a mercadopago.com.co
2. Clic en "Crear Cuenta"
3. Clic en "Continuar con Google" o "Continuar con Facebook"
4. Sigue pasos de Google/Facebook
5. Autoriza MercadoPago a acceder tu cuenta
6. ¡Listo!
```

### PASO 2: Completar perfil (10 minutos)

Después del primer acceso, MercadoPago te pedirá completar:

**A. Información Personal**

```
Nombre completo:    Juan Pérez González
Tipo de ID:         Cédula de Ciudadanía
Número de ID:       1234567890
Fecha de nacimiento: 15/01/1990
Género:             Masculino/Femenino
```

**B. Información Empresarial** (Si es negocio)

```
Nombre comercial:   KD-NA PRODUCTOS
Tipo de negocio:    Comercio mayorista
Actividad:          Venta de productos
Sitio web:          kdna-productos.netlify.app (opcional)
```

**C. Dirección**

```
País:               Colombia
Departamento:       Cundinamarca
Ciudad:             Bogotá
Dirección:          Calle 123 #45-67
Código Postal:      110111
```

Cada sección tiene botón "Continuar" o "Guardar".

### PASO 3: Configurar cuenta bancaria (5 minutos)

1. Desde el dashboard principal
2. Busca **"Mis Datos"** o **"Configuración"**
3. Selecciona **"Información Bancaria"**
4. Haz clic **"Agregar una cuenta"**

```
FORMULARIO:
───────────
Banco:              BANCOLOMBIA ▼
Tipo de cuenta:     Cuenta corriente ▼
Titular:            JUAN PEREZ GONZALEZ
Número de cuenta:   123456789
Dígito verificador: 5 (si es Bancolombia)
```

Haz clic en **"Confirmar"**

⚠️ **IMPORTANTE**:

- El nombre debe coincidir exactamente con tu banco
- El número de cuenta debe ser correcto
- Revisa 3 veces antes de confirmar

### PASO 4: Obtener API Keys (3 minutos)

**EN MODO TESTING** (para pruebas):

```
1. Dashboard → Desarrolladores
2. Haz clic en "Credenciales"
3. Verás 2 opciones:
   - Modo Testing (arriba)
   - Modo Producción (abajo)
4. En "Modo Testing" verás:
   PUBLIC KEY TEST:   APP_USR-xxxxxxxx (test)
   ACCESS TOKEN TEST: APP_USR-xxxxxxxx (test)
5. Cópia estos para hacer pruebas
```

**EN MODO PRODUCCIÓN** (dinero real):

```
1. Mismo lugar: Desarrolladores → Credenciales
2. Scroll abajo hasta "Modo Producción"
3. Verás:
   PUBLIC KEY PROD:   APP_USR-xxxxxxxx (REAL)
   ACCESS TOKEN PROD: APP_USR-xxxxxxxx (REAL)
4. Copia estos para dinero real
5. ⚠️ CUIDADO: No compartas estas claves
```

---

## 🔌 ACTIVAR EN TU SITIO WEB

### PASO 5: Actualizar el archivo de configuración

1. Abre: `src/js/payments.js`
2. Busca (alrededor de línea 8):

```javascript
const PAYMENT_CONFIG = {
  provider: "demo",  // ← AQUÍ
```

3. Cámbialo por:

```javascript
const PAYMENT_CONFIG = {
  provider: "mercadopago",  // ✅ CAMBIO
```

### PASO 6: Pegar tu API Key

1. En el mismo archivo, busca (línea 9-10):

```javascript
  mercadopago: {
    publicKey: "APP_USR-xxxxxxxxxxxxxxxxxxxxxxxx",  // ← AQUÍ
```

2. Reemplaza con tu public key de MercadoPago:

```javascript
  mercadopago: {
    publicKey: "APP_USR-TU_LLAVE_PUBLICA_REAL",  // ✅ NUEVO
```

3. Guarda el archivo (Ctrl+S)

### PASO 7: Guardar número de banco

1. Mismo archivo, busca (línea 13-18):

```javascript
  bankAccount: {
    bank: "BANCOLOMBIA",
    accountNumber: "XXXXXXXXXXX",  // ← AQUÍ
    accountHolder: "KD-NA PRODUCTOS S.A.S.",
    accountType: "Corriente",
  },
```

2. Actualiza con tus datos reales:

```javascript
  bankAccount: {
    bank: "BANCOLOMBIA",                    // Tu banco
    accountNumber: "123456789",             // Tu número de cuenta
    accountHolder: "JUAN PEREZ GONZALEZ",   // Tu nombre completo
    accountType: "Corriente",               // O Ahorros
  },
```

3. Guarda el archivo

---

## 🧪 PROBAR CON TARJETAS DE PRUEBA

Ahora vamos a probar.

### Tarjetas de Prueba disponibles:

**Modo Testing** (dinero simulado):

```
VISA:
Número:      4539 9999 9999 9993
Mes/Año:     12/25 (o cualquiera futuro)
CVV:         123 (cualquier número)
Nombre:      TEST TEST

MASTERCARD:
Número:      5425 2334 3010 9903
Mes/Año:     12/25
CVV:         123
Nombre:      TEST TEST

AMEX:
Número:      3782 822463 10005
Mes/Año:     12/25
CVV:         1234
Nombre:      TEST TEST
```

### Hacer una transacción de prueba:

1. Abre tu sitio: kdna-productos.netlify.app (o localhost si está local)
2. Agrega productos al carrito
3. Haz clic en "Ir al Carrito"
4. Haz clic en "Proceder al Pago"
5. Completa datos personales:
   ```
   Nombre:    Juan Pérez
   Teléfono:  3001234567
   Email:     juan@email.com
   Dirección: Calle 123 #45
   ```
6. Elige tipo de entrega (Entrega a domicilio o En tienda)
7. En datos de tarjeta, entra:
   ```
   Nombre:    TEST TEST
   Número:    4539 9999 9999 9993
   Mes/Año:   12/25
   CVV:       123
   ```
8. Haz clic en "CONFIRMAR PAGO"
9. Espera a que procese (1-2 segundos)
10. ✅ Debes ver confirmación

### ¿Qué ves si todo está ok?

```
✅ ¡Pago procesado exitosamente! 🎉

ID de Orden: ORD-1234567890
Transacción: TRANS-1234567890
Total: $50,000

Los fondos se depositarán en:
Banco: BANCOLOMBIA
Cuenta: ...6789
En: 1-3 días hábiles

Tu pedido llegará [tipo entrega]
Te enviaremos un email con todos los detalles.
```

---

## 🪙 AHORA CON DINERO REAL

### Cambiar de Modo Testing a Producción

El proceso es el mismo, solo cambias las credenciales:

```javascript
// ANTES (Testing):
const PAYMENT_CONFIG = {
  provider: "mercadopago",
  mercadopago: {
    publicKey: "APP_USR-TEST-xxxxxxxx", // Testing
  },
};

// DESPUÉS (Producción):
const PAYMENT_CONFIG = {
  provider: "mercadopago",
  mercadopago: {
    publicKey: "APP_USR-PROD-xxxxxxxx", // Producción
  },
};
```

### Checklist antes de ir a producción:

- [ ] La cantidad cobrada es correcta
- [ ] El dinero aparece en tu cuenta MercadoPago
- [ ] Tu banco deposita en 1-3 días
- [ ] Cliente recibe confirmación
- [ ] Orden se guarda en BD
- [ ] No tienes errores en consola (F12)

---

## 💳 VER TUS TRANSACCIONES EN MERCADOPAGO

### Dashboard de MercadoPago

```
1. Inicia sesión: mercadopago.com.co
2. Click en tu nombre (arriba a la derecha)
3. Dashboard
4. Verás tarjeta "Saldo"
5. Click en "Historial de transacciones"
6. Ves todas tus ventas con:
   - Fecha
   - Cliente
   - Monto
   - Comisión
   - Estado (Aprobado, Fallido, etc.)
```

### En tu banco

```
1-3 días después:
1. Abre tu app bancaria
2. Ve "Movimientos" o "Historial"
3. Busca transacción de MercadoPago
4. Ves: +$XX,XXX "Payout Mercado Pago"
5. ¡El dinero está en tu cuenta!
```

---

## ⚠️ COSAS IMPORTANTES

### SEGURIDAD

- ❌ NUNCA compartas tu Public Key públicamente
- ❌ NUNCA compartas tu Access Token
- ❌ NO guardes API keys en GitHub publico
- ✅ Usa variables de entorno en producción
- ✅ El backend debe validar pagos (no solo frontend)

### COMISIONES

```
Tu venta:         $100,000
Comisión MP:      -$2,900 (2.9%)
IVA comisión:     -$551 (19%)
Total comisión:   -$3,451
───────────────────────
TÚ RECIBES:       $96,549
```

La comisión se paga automáticamente, no tienes que hacer nada.

### PROBLEMAS COMUNES

**P: No llega el dinero a mi banco**
R: Espera 1-3 días hábiles. Ve a Panel MP → Saldo → Ver payout.

**P: Aparece como "En revisión"**
R: Some transacciones pendientes se liberan después. Ver tu panel MP.

**P: El pago fue rechazado**
R: Cliente debe intentar con otra tarjeta. Revisa error exacto.

**P: ¿Las tarjetas de prueba cobran real?**
R: NO. En Modo Testing son 100% simuladas.

---

## 🚀 RESUMEN FINAL

### Lo que hiciste:

1. ✅ Creaste cuenta MercadoPago
2. ✅ Agregaste tu banco
3. ✅ Obtuviste API Keys
4. ✅ Las pegaste en tu código
5. ✅ Probaste con tarjetas de prueba
6. ✅ Verificaste que funciona

### Resultado:

**Tu tienda ahora acepta pagos REALES**

- Dinero llega a tu banco en 1-3 días
- Clientes pueden pagar con cualquier tarjeta
- Todo automatizado y seguro

---

## 📚 DOCUMENTACIÓN ADICIONAL

- Lee: `DIAGRAMA_PAGOS.md` - Cómo va el dinero
- Lee: `GUIA_PAGOS.md` - Más detalles completos
- Lee: `ADMIN_PANEL_GUIA.md` - Ver tus transacciones
- Soporte MP: https://www.mercadopago.com.co/help

---

**¡Felicidades! 🎉 Tu tienda KD-NA PRODUCTOS está lista para aceptar pagos reales con MercadoPago.**
