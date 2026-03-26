# 💰 DIAGRAMA: ¿A DÓNDE VAN LOS PAGOS?

## FLUJO VISUAL DEL DINERO

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  👤 CLIENTE DE KD-NA PRODUCTOS                            │
│  Quiere comprar: 50 tapas de cerveza ($50,000)           │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 1. INGRESA TARJETA DE CRÉDITO
                 │    (Crédito, Débito, etc.)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💳 SITIO WEB KD-NA (kdna-productos.netlify.app)         │
│  Tu página web en línea                                   │
│                                                             │
│  Botón: "CONFIRMAR PAGO"                                 │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ 2. ENVÍA DATOS DE TARJETA
                 │    (De forma segura)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔐 MERCADOPAGO (Gateway de Pagos)                       │
│  Tu procesador de pagos elegido                          │
│  https://www.mercadopago.com.co/                        │
│                                                             │
│  - Valida tarjeta                                        │
│  - Comunica con banco del cliente                        │
│  - Autoriza o rechaza la transacción                    │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ├─ Si rechaza: ❌ Error
                 │
                 │ Si aprueba: ✅ Continúa→
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏦 BANCO DEL CLIENTE                                    │
│  (Banco de crédito que emitió la tarjeta)               │
│                                                             │
│  - Autoriza la transacción                              │
│  - Descuenta $50,000 de la cuenta del cliente           │
│  - Envía dinero a MercadoPago                           │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ $50,000 en tránsito
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💼 MERCADOPAGO WALLET (Tu Billetera)                    │
│  El dinero llega primero aquí                            │
│                                                             │
│  Saldo recibido: $50,000                                │
│                                                             │
│  Menos comisión:                                        │
│    - MercadoPago: 2.9%      = $1,450                   │
│    - IVA (19%):             = $275.50                   │
│    - Total comisión:        = $1,725.50                │
│                                                             │
│  Saldo disponible: $48,274.50                           │
│                                                             │
│  (Ves esto en tu panel MercadoPago)                     │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ MercadoPago genera "Payout"
                 │ (Transferencia a tu banco)
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏛️  TU BANCO EN COLOMBIA                               │
│  (Bancolombia, BBVA, etc.)                              │
│                                                             │
│  Recibe transacción de MercadoPago:                    │
│  $48,274.50                                             │
│                                                             │
│  Referencia: "Payout MercadoPago - Venta #123456"      │
│                                                             │
│  ⏱️  Tiempo: 1-3 días hábiles después del pago         │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ El dinero está en tu cuenta
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ✅ DINERO EN TU CUENTA                                  │
│  Puedes retirar, transferir, usar libremente            │
│                                                             │
│  Cantidad: $48,274.50                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## CRONOGRAMA

| Evento                      | Tiempo        | Estado            |
| --------------------------- | ------------- | ----------------- |
| Cliente compra              | 0 min         | Pago en proceso   |
| Tu web envía a MercadoPago  | +1 seg        | Enviado           |
| MercadoPago valida tarjeta  | +5 seg        | Validando         |
| Banco autoriza              | +15 seg       | Autorizado        |
| Dinero llega a MercadoPago  | +30 seg       | ✅ Recibido       |
| MercadoPago genera payout   | +1 hora       | Programado        |
| Dinero en tránsito al banco | +4-8 horas    | En camino         |
| **Dinero en tu cuenta**     | **+1-3 días** | **✅ Completado** |

---

## DESGLOSE DE DINERO: $50,000

```
Monto Original:           $50,000.00
                              ↓
Comisión MercadoPago:     -$1,450.00 (2.9%)
IVA sobre comisión:       -$  275.50 (19% de la comisión)
                              ↓
DINERO QUE RECIBES:       $48,274.50 ✅
```

---

## MÚLTIPLES TRANSACCIONES EN UN DÍA

```
CLIENTE 1: $50,000 → $48,274 ✅
CLIENTE 2: $30,000 → $28,964 ✅
CLIENTE 3: $20,000 → $19,309 ✅
────────────────────────────
TOTAL:   $100,000 → $96,547

Comisión total cobrada: $3,453
```

Todos se suman en tu MercadoPago wallet, y se transfieren juntos a tu banco cada 24-48 horas.

---

## VER TU DINERO EN MERCADOPAGO

### Panel de MercadoPago:

```
1. Abre: https://www.mercadopago.com.co/
2. Inicia sesión
3. Ve a "Saldo" o "Mi dinero"
4. Verás:

   ┌─────────────────────────────────────┐
   │ DISPONIBLE: $48,274.50              │
   │ EN REVISIÓN: $0                     │
   │ BLOQUEADO: $0                       │
   │                                     │
   │ Transacciones: 3 hoy                │
   │ Total ingreso: $100,000             │
   │ Comisiones: -$3,453                 │
   └─────────────────────────────────────┘

5. Haz clic en "Historial"
6. Verás cada transacción de cliente
7. Haz clic en "Transferir a mi cuenta"
   para enviar $ a tu banco manualmente
   (O se transfiere automático cada 24-48h)
```

---

## VER DINERO EN TU BANCO

### APP/Web de tu banco:

```
Después de 1-3 días, consultando tu banco ves:

┌─────────────────────────────┐
│ TRANSACCIONES RECIENTES     │
├─────────────────────────────┤
│ ↓ Payout MercadoPago        │
│   +$48,274.50               │
│   Ref: MP-123456789         │
│   Hoy a las 10:30 AM        │
├─────────────────────────────┤
│ Saldo actual: $48,274.50    │
└─────────────────────────────┘
```

---

## RESUMEN: ¿A DÓNDE VA MI DINERO?

| Pregunta                         | Respuesta                                                           |
| -------------------------------- | ------------------------------------------------------------------- |
| **¿A qué cuenta va?**            | Tu cuenta bancaria colombiana (Bancolombia, BBVA, Davivienda, etc.) |
| **¿Quién lo transfiere?**        | MercadoPago automáticamente después de 24-48 horas                  |
| **¿Cuándo lo recibo?**           | 1-3 días hábiles después del pago                                   |
| **¿Cuánto recibo?**              | Total de compra MENOS comisión (2.9% + IVA)                         |
| **¿Puedo verlo?**                | Sí: Panel MercadoPago → Saldo → Historial                           |
| **¿Puedo retirarlo?**            | Sí: Está en tu cuenta del banco, es tuyo 100%                       |
| **¿Hay comisiones adicionales?** | Solo MercadoPago cobra (2.9%). Tu banco NO cobra retiro             |
| **¿Si rechaza la tarjeta?**      | El dinero NO va a ningún lado, intenta con otra tarjeta             |

---

## SEGURIDAD: ¿CÓMO SABE QUE ES REAL?

1. **HTTPS**: Tu sitio web está protegido (URL comienza con 🔒 https://)
2. **Tokenización**: Números de tarjeta NUNCA se guardan en tu servidor
3. **Validación 3D Secure**: MercadoPago valida con banco cliente
4. **Encriptación**: Todo viaja encriptado
5. **PCI Compliance**: Cumple normas internacionales

**Resultado**: Es 100% seguro. El cliente puede estar tranquilo.

---

## OPCIONES ALTERNATIVAS

Si no quieres MercadoPago, estas son otras opciones:

### STRIPE

```
Cliente compra $50,000
         ↓
Stripe procesa
         ↓
Comisión: 2.9% + $0.30 USD
         ↓
TÚ RECIBES: $48,247 (aproximado)
         ↓
2-3 días a tu banco
```

### PAYPAL

```
Cliente compra $50,000
         ↓
PayPal procesa
         ↓
Comisión: 3.49% + $0.30 USD
         ↓
TÚ RECIBES: $48,199 (aproximado)
         ↓
3-5 días a tu cuenta
```

---

## PASO A PASO: CONFIGURAR MERCADOPAGO

```
1️⃣  Ve a mercadopago.com.co
    └─ Clic en "Crear Cuenta"

2️⃣  Completa datos básicos
    └─ Nombre, email, teléfono, CC

3️⃣  Verifica tu correo
    └─ MercadoPago te envía email

4️⃣  Agrega tu banco
    └─ Panel → Datos Bancarios
       └─ Número de cuenta
       └─ Tu banco
       └─ Tu nombre

5️⃣  Obtén API Keys
    └─ Dashboard → Credenciales
    └─ Copia "Public Key"

6️⃣  Actualiza tu web
    └─ Archivo: src/js/payments.js
    └─ Cambia: provider: "demo" → "mercadopago"
    └─ Pega tu Public Key

7️⃣  Prueba
    └─ Usa tarjetas de test (abajo)
    └─ Verifica que dinero llega a MP

8️⃣  ¡LISTO!
    └─ Tu sitio acepta pagos reales
    └─ El dinero va a tu banco
```

---

## TARJETAS DE PRUEBA (Modo Testing)

Usa estas para PRUEBAS (no cobran dinero real):

```
Visa:        4539 9999 9999 9993
Mastercard:  5425 2334 3010 9903
Amex:        3782 822463 10005

Mes/Año: 12/25 (o cualquiera futuro)
CVV:     123 (o cualquier número)
```

---

## PREGUNTAS FRECUENTES

**P: ¿Si el cliente cancela/rechaza el pago?**
R: No pasa nada. El dinero NO se retira de su cuenta. Puede reintentar.

**P: ¿Pierdo dinero por comisiones?**
R: Sí, pero es normal. MercadoPago cobra 2.9% + IVA por procesar.

**P: ¿Puedo cambiar de banco después?**
R: Sí. Ve a tu cuenta MercadoPago y actualiza datos bancarios.

**P: ¿Qué pasa si ingreso mal mi número de cuenta?**
R: El dinero se rechaza, vuelve a MercadoPago. Arreglas el número y reintentas.

**P: ¿Puedo sacar dinero antes de 1-3 días?**
R: Con algunos bancos tienes "Saldo Disponible" inmediato en MercadoPago wallet.

**P: ¿Cuántas transacciones puedo procesar?**
R: Ilimitadas (todo va a tu banco).

---

## CONCLUSIÓN

```
┌──────────────────────────────────────┐
│  EL DINERO DE TUS CLIENTES          │
│  VA DIRECTO A TU BANCO              │
│                                      │
│  Cliente → MercadoPago              │
│           → Tu Banco                │
│           → Tu Cuenta (100% tuyo)   │
│                                      │
│  Simple. Seguro. Automático.        │
└──────────────────────────────────────┘
```

**¡Estás listo para aceptar pagos reales!**
