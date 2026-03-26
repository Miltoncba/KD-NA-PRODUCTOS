# 💳 GUÍA DE CONFIGURACIÓN DE PAGOS - KD-NA PRODUCTOS

## ¿A DÓNDE VAN LOS PAGOS?

Los pagos de tus clientes van directamente a **tu cuenta bancaria colombiana** mediante MercadoPago (o el proveedor que elijas).

### Flujo de Dinero:

```
Cliente (Tarjeta de Crédito)
    ↓
MercadoPago / Stripe / PayPal
    ↓
Tu Cuenta Bancaria Colombiana
    ↓
Dinero en tu banco (1-3 días hábiles)
```

---

## OPCIÓN 1: MERCADOPAGO ⭐ (RECOMENDADO PARA COLOMBIA)

### ¿Por qué MercadoPago?

- ✅ Nativo de Colombia (mejor para clientes locales)
- ✅ Depósitos rápidos (1-3 días hábiles)
- ✅ Comisiones: 2.9% + IVA
- ✅ Soporte en español
- ✅ Facil integración

### PASO 1: Crear Cuenta de MercadoPago

1. Ve a https://www.mercadopago.com.co/
2. Haz clic en **"Crear Cuenta"** o **"Vende con Mercado"**
3. Selecciona: "Quiero vender bienes o servicios"
4. Completa tu información:
   - Nombre completo
   - Email
   - Teléfono Colombia (+57)
   - Cédula de ciudadania (CC)
   - Domicilio

### PASO 2: Obtener Credenciales de API

1. Inicia sesión en tu cuenta
2. Ve a **Panel de Control** → **Credenciales**
3. Selecciona **"Modo Producción"**
4. Copia:
   - **Public Key**: APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxx
   - **Access Token**: APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

### PASO 3: Actualizar Configuración en el Código

Abre `src/js/payments.js` y reemplaza:

```javascript
const PAYMENT_CONFIG = {
  provider: "mercadopago", // ← Cambia "demo" por "mercadopago"
  mercadopago: {
    publicKey: "APP_USR-TU_LLAVE_PUBLICA_AQUI", // ← Pega tu Public Key
  },
  bankAccount: {
    bank: "BANCOLOMBIA", // ← Tu banco
    accountNumber: "TU_NUMERO_DE_CUENTA", // ← Tu número de cuenta
    accountHolder: "KD-NA PRODUCTOS S.A.S.",
    accountType: "Corriente",
  },
};
```

### PASO 4: Configurar Cuenta Bancaria en MercadoPago

1. En tu panel de MercadoPago, ve a **Configuración**
2. Selecciona **Datos Bancarios**
3. Agrega tu cuenta:
   - Banco: Bancolombia (o el tuyo)
   - Tipo de cuenta: Corriente
   - Número de cuenta: XXXXXXXXXX
   - Nombre titular: Tu nombre / Razón social

⚠️ **IMPORTANTE**: Los datos bancarios deben estar a nombre de la persona o empresa titular de la cuenta MercadoPago.

### PASO 5: Pruebas

**TARJETAS DE CRÉDITO DE PRUEBA** (MercadoPago - Modo Testing):

```
Visa:     4539 9999 9999 9993
Mastercard: 5425 2334 3010 9903
Amex:     3782 822463 10005

Mes/Año:  Cualquiera en el futuro (ej: 12/25)
CVV:      Cualquiera de 3-4 números
```

---

## OPCIÓN 2: STRIPE

### Paso 1: Crear cuenta en Stripe

1. Ve a https://stripe.com/co
2. Haz clic en "Registrarse"
3. Completa datos personales/empresariales

### Paso 2: Obtener API Keys

1. Dashboard → Developers → API Keys
2. Copia `Publishable Key` y `Secret Key`

### Paso 3: Configurar cuenta bancaria

- Requiere cuenta bancaria en USD o con IBAN
- Tiene comisiones más altas (2.9% + $0.30 por transacción)
- Mejor para empresas internacionales

---

## OPCIÓN 3: PAYPAL

### Paso 1: Crear Business Account en PayPal

1. https://www.paypal.com/webapps/mpp/merchant
2. Crea cuenta de negocios
3. Vincula tu banco colombiano

### Paso 2: Configurar integración

- Obtén API Signature o Certificate
- Configure IPN (Instant Payment Notification)

---

## FLUJO DE DINERO DETALLADO

### 1. Cliente compra en tu tienda:

```
Cliente ve carrito con total $50,000
Ingresa datos personales
Completa pago con tarjeta de crédito
```

### 2. Sistema procesa pago:

```
Tu sitio web envia dato al gateway (MercadoPago/Stripe/PayPal)
Gateway valida tarjeta con banco del cliente
Banco autoriza o rechaza transacción
```

### 3. Dinero llega a tu banco:

```
Si aprobado:
  → Dinero va a MercadoPago wallet
  → MercadoPago descuenta comisión (2.9%)
  → Saldo disponible se transfiere a tu banco
  → 1-3 días hábiles: Dinero en tu cuenta bancaria

Si rechazado:
  → Cliente recibe error
  → Puede reintentar con otra tarjeta
```

### 4. Confirmación:

```
Cliente recibe email de confirmación
Pago queda registrado en tu panel
Tú ves el dinero en tu banco en 1-3 días
```

---

## COMISIONES Y COSTOS

### MercadoPago 🟢

- **Comisión**: 2.9% + IVA (≈3.51%)
- **Ejemplo**: $100,000 → Recibes ≈$96,490
- **Depósito**: 1-3 días hábiles
- **Mejor para**: Negocios medianos y pequeños en Latinoamérica

### Stripe 🔵

- **Comisión**: 2.9% + $0.30 USD
- **Ejemplo**: $100,000 → Recibes ≈$97,120
- **Depósito**: 2-3 días hábiles
- **Mejor para**: Empresas internacionales/grandes volúmenes

### PayPal 🔴

- **Comisión**: 3.49% + $0.30 USD
- **Ejemplo**: $100,000 → Recibes ≈$96,700
- **Depósito**: 3-5 días hábiles
- **Mejor para**: Vendedores pequeños/ocasionales

---

## CONFIGURACIÓN EN EL CÓDIGO

El sistema está preparado para cambiar entre proveedores. Abre `src/js/payments.js`:

### Cambiar Provider (FÁCIL):

```javascript
// Para MERCADOPAGO:
const PAYMENT_CONFIG = {
  provider: "mercadopago", // ← Cambiar aquí
  mercadopago: {
    publicKey: "App_USR-xxxxx",
  },
  // ...
};

// Para STRIPE:
const PAYMENT_CONFIG = {
  provider: "stripe", // ← O aquí
  stripe: {
    publicKey: "pk_live_xxxxx",
  },
  // ...
};

// Para DEMO (pruebas sin pago real):
const PAYMENT_CONFIG = {
  provider: "demo", // ← O aquí para testing
  // ...
};
```

---

## ACTIVAR/DESACTIVAR MODO DEMO

### Modo Demo (Para pruebas sin dinero real):

```javascript
// En src/js/payments.js, línea 8:
provider: "demo"; // ← Los pagos son simulados (90% éxito)
```

### Modo Real (Para aceptar pagos reales):

```javascript
// En src/js/payments.js, línea 8:
provider: "mercadopago"; // ← Los pagos van a tu cuenta
```

---

## TRANSACCIONES REGISTRADAS

Todas las transacciones se guardan en `localStorage` con estructura:

```javascript
{
  id: "RCP-1234567890",
  orderId: "ORD-1234567890",
  userId: "user-123",
  transactionId: "TRANS-1234567890",
  amount: 50000,
  provider: "mercadopago",
  status: "approved",
  items: [...],
  customer: {name, email, phone, address},
  timestamp: "2024-01-15T10:30:00",
  accountTo: "123456789"
}
```

**Ver transacciones en navegador:**

1. Abre **DevTools** (F12)
2. Ve a **Console**
3. Escribe: `JSON.parse(localStorage.getItem('kdna_transactions'))`

---

## 🔒 SEGURIDAD

⚠️ **NUNCA**:

- Compartas tus API Keys públicamente
- Guardes contraseñas en el código
- Envíes números de tarjeta por email

### Buenas prácticas:

1. Usa variables de entorno (`.env` local)
2. Backend maneja datos sensibles
3. HTTPS en producción (Netlify/Vercel lo hace automático)
4. Valida pagos en el server, no solo en frontend

---

## VERIFICACIÓN: ¿DÓNDE VAN MIS PAGOS?

### Después de activar MercadoPago:

**1. Panel de MercadoPago**:

- Autenticarse en https://www.mercadopago.com.co/
- Ver "Historial de transacciones"
- Dinero pendiente → Saldo disponible → Transferencia a banco

**2. Panel de tu Banco**:

- Ver depósitos de MercadoPago
- Referencia: Payout de tus ventas
- Dinero llega en tu cuenta corriente

**3. Archivo de Transacciones** (En tu navegador):

- F12 → Console
- `JSON.parse(localStorage.getItem('kdna_transactions'))`
- Ver cada transacción procesada

---

## ¿DUDAS FRECUENTES?

**P: ¿Cuánto cuesta cobrar pagos?**
R: La comisión depende del proveedor (2.9%-3.5%). MercadoPago: 2.9% + IVA.

**P: ¿Cuándo recibo el dinero?**
R: 1-3 días hábiles después del pago confirmado en MercadoPago.

**P: ¿Puedo cambiar de proveedor después?**
R: Sí, solo cambia `provider` en `src/js/payments.js` y reconfigura API keys.

**P: ¿Qué pasa si usas MercadoPago pero no configuras banco?**
R: El dinero se queda en tu wallet de MercadoPago, puedes sacarlo cuando quieras.

**P: ¿Necesito un RUT/NIT?**
R: MercadoPago requiere CC. Para empresas legales, necesitas número de registro.

---

## PRÓXIMOS PASOS

- [ ] Elige proveedor: MercadoPago (recomendado)
- [ ] Crea cuenta en MercadoPago.com.co
- [ ] Obtén Public Key y Access Token
- [ ] Actualiza `PAYMENT_CONFIG` en `src/js/payments.js`
- [ ] Configura tu número de cuenta bancaria
- [ ] Prueba con tarjetas de test
- [ ] Activa Modo Producción
- [ ] Sube a producción (Netlify/Vercel)

---

## 📞 SOPORTE

**MercadoPago**: https://www.mercadopago.com.co/help
**Stripe**: https://stripe.com/docs
**PayPal**: https://www.infocheque.com.co/

Tu admin: kdna.productos@email.com
