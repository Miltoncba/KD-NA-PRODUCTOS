# 🔧 CÓMO ACCEDER AL PANEL ADMINISTRATIVO

## ACCESO RÁPIDO: CONSOLA DEL NAVEGADOR

### Paso 1: Abre la consola

```
Windows: F12
Mac: Cmd + Option + I
Firefox: F12
```

### Paso 2: Ve a la pestaña "Console"

### Paso 3: Copia y pega los comandos abajo

---

## 📊 VER TODAS LAS TRANSACCIONES

```javascript
showTransactionsDashboard();
```

**Muestra:**

- Total de ventas (dinero bruto)
- Total de transacciones
- Transacciones aprobadas
- Dinero neto a recibir (después de comisión)
- Tabla con historial completo
- Información de tu banco

**Ejemplo de salida:**

```
DASHBOARD DE TRANSACCIONES

Total de Ventas: $500,000
Transacciones: 10
Aprobadas: 9
Fallidas: 1

Información de Depósito:
Banco: BANCOLOMBIA
Cuenta: 123456789
Titular: KD-NA PRODUCTOS S.A.S.
Depósito: 1-3 días hábiles

[Tabla con historial]
```

---

## 🔍 VER DETALLES DE UN PAGO ESPECÍFICO

Primero, obtén el ID del recibo. Copia esto:

```javascript
// Ver todos los IDs de recibos
JSON.parse(localStorage.getItem("kdna_transactions")).map((t) => t.id);
```

Luego muestra el detalle:

```javascript
showTransactionDetail("RCP-1234567890");
// ← Reemplaza RCP-1234567890 con el ID real
```

**Muestra:**

- Nombre y email del cliente
- Productos comprados
- Monto total
- Transacción ID
- A dónde fue el dinero

---

## 📥 DESCARGAR TRANSACCIONES EN EXCEL

```javascript
exportTransactionsCSV();
```

**Qué hace:**

1. Crea archivo CSV con todas las transacciones
2. Lo descarga automáticamente
3. Guardado como: `transacciones_kdna_FECHA.csv`
4. Abre en Excel/Sheets para análisis

**Contenido del CSV:**

```
Fecha,Cliente,Email,Monto,Proveedor,Estado,ID Transacción
"2024-01-15 10:30:00","Juan Pérez","juan@email.com",50000,"mercadopago","approved","TRANS-123"
```

---

## ⚙️ VER CONFIGURACIÓN DE PAGOS

```javascript
showPaymentSetup();
```

**Muestra:**

- Proveedor actual (demo, mercadopago, stripe, etc.)
- Instrucciones paso a paso para cada proveedor
- Dónde obtener API keys
- Dónde actualizar configuración
- Tarjetas de prueba

---

## 💰 VER RESUMEN RÁPIDO DE GANANCIAS

```javascript
getPaymentSummary();
```

**Retorna un objeto con:**

```javascript
{
  total_transactions: 10,              // Cantidad de compras
  total_sales: 500000,                 // Dinero bruto
  approved: 9,                         // Pagos aprobados
  failed: 1,                           // Pagos rechazados
  by_provider: { mercadopago: 9, demo: 1 },  // Por proveedor
  by_status: { approved: 9, failed: 1 }      // Por estado
}
```

---

## 🏦 VER INFORMACIÓN DE TU BANCO

```javascript
getAccountInfo();
```

**Retorna:**

```javascript
{
  bankName: "BANCOLOMBIA",
  accountNumber: "123456789",
  holder: "KD-NA PRODUCTOS S.A.S.",
  type: "Corriente",
  depositTime: "1-3 días hábiles",
  message: "Los pagos se acreditarán automáticamente"
}
```

---

## 📍 VER TODAS LAS TRANSACCIONES EN FORMATO JSON

```javascript
// Ver como array JSON
JSON.parse(localStorage.getItem("kdna_transactions"));

// O ver específicamente:
const transactions = JSON.parse(localStorage.getItem("kdna_transactions"));
console.table(transactions); // Muestra en tabla
```

---

## 📝 VER TODAS LAS ÓRDENES

```javascript
JSON.parse(localStorage.getItem("orders"));
```

---

## 👥 VER TODOS LOS USUARIOS

```javascript
JSON.parse(localStorage.getItem("kdna_users"));
```

---

## 🛒 VER CARRITO ACTUAL

```javascript
console.log(cart);
```

---

## 👤 VER USUARIO LOGUEADO

```javascript
console.log(currentUser);
```

---

## 🧪 LIMPIAR DATOS DE PRUEBA

**Limpiar todas las transacciones:**

```javascript
localStorage.setItem("kdna_transactions", "[]");
location.reload();
```

**Limpiar todas las órdenes:**

```javascript
localStorage.setItem("orders", "[]");
location.reload();
```

**Limpiar todo:**

```javascript
localStorage.clear();
location.reload();
```

⚠️ **Cuidado:** No puedas deshacer esto.

---

## 📌 EJEMPLOS COMPLETOS

### 1. Ver ganancias del día

```javascript
// En consola:
const summary = getPaymentSummary();
console.log(`
  Total vendido: $${summary.total_sales}
  Transacciones: ${summary.total_transactions}
  Aprobadas: ${summary.approved}
  Dinero neto: $${Math.round(summary.total_sales * 0.9649)}
`);
```

### 2. Buscar transacción de un cliente específico

```javascript
const transactions = JSON.parse(localStorage.getItem("kdna_transactions"));
const clientTransactions = transactions.filter(
  (t) => t.customer.email === "cliente@email.com",
);
console.table(clientTransactions);
```

### 3. Ver dinero por proveedor

```javascript
const summary = getPaymentSummary();
console.log("Dinero por proveedor:", summary.by_provider);
```

### 4. Verificar que el pago fue a tu banco

```javascript
const transactions = JSON.parse(localStorage.getItem("kdna_transactions"));
const lastTransaction = transactions[transactions.length - 1];
console.log(`
  Dinero irá a: ${lastTransaction.accountTo}
  Banco: BANCOLOMBIA
  En: 1-3 días hábiles
`);
```

---

## 🎯 FLUJO TÍPICO DE USO

### Cada vez que haces una venta:

```javascript
// 1. Ver el dashboard completo
showTransactionsDashboard();

// 2. O ver resumen rápido
getPaymentSummary();

// 3. Si quieres detalles de esa venta
showTransactionDetail("RCP-XXXX");

// 4. Si necesitas reporte para contabilidad
exportTransactionsCSV();
```

---

## 🔐 PRIVACIDAD Y SEGURIDAD

**Estos comandos:**

- ✅ Solo ven datos almacenados localmente
- ✅ NO envían información a internet
- ✅ Solo tú (admin del navegador) puedes verlos
- ✅ Son seguros de ejecutar

**Información que se guarda:**

- Nombres de clientes
- Emails
- Montos de compra
- Fecha de transacción
- ID de transacción

**Lo que NO se guarda:**

- Números de tarjeta completos
- CVV o códigos de seguridad
- Contraseñas
- Datos sensibles

---

## 🚨 PROBLEMAS COMUNES

**P: No veo transacciones**
R: Es normal si acabas de instalar.
Haz una prueba de compra primero.

**P: El comando dice "undefined"**
R: Asegúrate que la web está cargada.
Recarga la página y vuelve a intentar.

**P: Quiero limpiar todo pero no sé cómo**

```javascript
localStorage.removeItem("kdna_transactions");
localStorage.removeItem("orders");
localStorage.removeItem("cart");
location.reload();
```

**P: ¿Dónde está mi dinero real?**
R: En MercadoPago wallet, luego en tu banco.
Ver tutorial: DIAGRAMA_PAGOS.md

---

## 💡 TIPS ÚTILES

### Copiar todo en formato bonito:

```javascript
console.log(JSON.stringify(getPaymentSummary(), null, 2));
```

### Ver solo aprobados:

```javascript
const trans = JSON.parse(localStorage.getItem("kdna_transactions"));
const approved = trans.filter((t) => t.status === "approved");
console.table(approved);
```

### Ver solo fallidos:

```javascript
const trans = JSON.parse(localStorage.getItem("kdna_transactions"));
const failed = trans.filter((t) => t.status === "failed");
console.table(failed);
```

### Ver última transacción:

```javascript
const trans = JSON.parse(localStorage.getItem("kdna_transactions"));
console.log(trans[trans.length - 1]);
```

---

## 📱 EN TELÉFONO

Si accedes desde celular:

1. Abre Chrome/Firefox
2. Abre la web en desktop mode (Settings → Desktop mode)
3. F12 (o presiona el menú, luego "Inspect")
4. Ve a Console
5. Pega los comandos

Alternativa: Accede desde laptop para ver mejor.

---

## 🔗 COMANDOS DE REFERENCIA RÁPIDA

| Comando                           | Qué hace                       |
| --------------------------------- | ------------------------------ |
| `showTransactionsDashboard()`     | Ver todas las transacciones    |
| `showPaymentSetup()`              | Ver instrucciones de setup     |
| `getPaymentSummary()`             | Resumen rápido de ganancias    |
| `exportTransactionsCSV()`         | Descargar Excel                |
| `getAccountInfo()`                | Dónde va el dinero             |
| `showTransactionDetail("RCP-ID")` | Detalles de una compra         |
| `showWherePaymentsGo()`           | Explicación de flujo de dinero |

---

## ✨ EJEMPLO COMPLETO

### Quiero ver todo en 30 segundos:

```javascript
// Paso 1: Abrir consola (F12)

// Paso 2: Pegar esto:
showTransactionsDashboard();

// ¡Listo! Verás:
// - Total vendido
// - Dinero a recibir
// - Tabla con cada cliente
// - A dónde va el dinero
```

---

**¡Ahora ya sabes cómo acceder a tu panel administrativo! 🎉**
