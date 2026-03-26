/**
 * PANEL ADMINISTRATIVO - Ver Transacciones y Configurar Pagos
 *
 * Este archivo proporciona funciones para ver:
 * - Todas las transacciones realizadas
 * - Ganancias totales
 * - Detalles de cada orden
 * - Información de depósitos a tu banco
 */

// ============ VISTA DE TRANSACCIONES ============

function showTransactionsDashboard() {
  const transactions = JSON.parse(
    localStorage.getItem("kdna_transactions") || "[]",
  );
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalTransactions = transactions.length;
  const approvedTransactions = transactions.filter(
    (t) => t.status === "approved",
  ).length;

  let html = `
    <div class="admin-dashboard">
      <h2>📊 DASHBOARD DE TRANSACCIONES</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">$${totalSales.toLocaleString("es-ES")}</div>
          <div class="stat-label">Total de Ventas</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalTransactions}</div>
          <div class="stat-label">Transacciones</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${approvedTransactions}</div>
          <div class="stat-label">Aprobadas</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${transactions.filter((t) => t.status === "failed").length}</div>
          <div class="stat-label">Fallidas</div>
        </div>
      </div>

      <div class="bank-info-card">
        <h3>🏦 Información de Depósito</h3>
        <p><strong>Banco:</strong> ${PAYMENT_CONFIG.bankAccount.bank}</p>
        <p><strong>Cuenta:</strong> ${PAYMENT_CONFIG.bankAccount.accountNumber}</p>
        <p><strong>Titular:</strong> ${PAYMENT_CONFIG.bankAccount.accountHolder}</p>
        <p><strong>Tipo:</strong> ${PAYMENT_CONFIG.bankAccount.accountType}</p>
        <p><strong>Tiempo de transferencia:</strong> 1-3 días hábiles</p>
      </div>

      <h3>📋 Histórico de Transacciones</h3>
      <table class="transactions-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Proveedor</th>
            <th>Estado</th>
            <th>ID Transacción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  `;

  if (transactions.length === 0) {
    html += `<tr><td colspan="7" style="text-align: center;">No hay transacciones aún</td></tr>`;
  } else {
    transactions.forEach((trans) => {
      const statusColor =
        trans.status === "approved"
          ? "green"
          : trans.status === "failed"
            ? "red"
            : "orange";
      html += `
        <tr>
          <td>${trans.timestamp}</td>
          <td>${trans.customer.name}<br/><small>${trans.customer.email}</small></td>
          <td>$${trans.amount.toLocaleString("es-ES")}</td>
          <td><strong>${trans.provider.toUpperCase()}</strong></td>
          <td><span style="color: ${statusColor}; font-weight: bold;">${trans.status.toUpperCase()}</span></td>
          <td><code>${trans.transactionId}</code></td>
          <td><button onclick="showTransactionDetail('${trans.id}')">Ver</button></td>
        </tr>
      `;
    });
  }

  html += `
        </tbody>
      </table>

      <h3>💰 Proyección de Ingresos</h3>
      <div class="revenue-projection">
        <p><strong>Ingresos Brutos:</strong> $${totalSales.toLocaleString("es-ES")}</p>
        <p><strong>Comisión MercadoPago (2.9% + IVA):</strong> $${Math.round(totalSales * 0.0351).toLocaleString("es-ES")}</p>
        <p style="font-size: 1.2em; color: green;"><strong>Ingresos Netos:</strong> $${Math.round(totalSales * 0.9649).toLocaleString("es-ES")}</p>
      </div>

      <h3>⚙️ Configuración de Pagos</h3>
      <div class="payment-config">
        <p><strong>Proveedor Actual:</strong> <code>${PAYMENT_CONFIG.provider.toUpperCase()}</code></p>
        <p>
          Para cambiar proveedor, edita <code>src/js/payments.js</code> y actualiza:
          <br/>
          <code>provider: "mercadopago"</code> (o "stripe", "paypal", "demo")
        </p>
        <button onclick="exportTransactionsCSV()">📥 Descargar CSV</button>
        <button onclick="showPaymentSetup()">⚙️ Ver Configuración Completa</button>
      </div>
    </div>
  `;

  return html;
}

// ============ DETALLES DE TRANSACCIÓN ============

function showTransactionDetail(transactionId) {
  const transactions = JSON.parse(
    localStorage.getItem("kdna_transactions") || "[]",
  );
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    alert("Transacción no encontrada");
    return;
  }

  let detail = `
    ╔════════════════════════════════════════╗
    ║    DETALLES DE TRANSACCIÓN             ║
    ╚════════════════════════════════════════╝

    ID RECIBO: ${transaction.id}
    ID TRANSACCIÓN: ${transaction.transactionId}
    FECHA: ${transaction.timestamp}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    CLIENTE
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Nombre: ${transaction.customer.name}
    Email: ${transaction.customer.email}
    Teléfono: ${transaction.customer.phone}
    Dirección: ${transaction.customer.address}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    PRODUCTOS
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;

  transaction.items.forEach((item) => {
    const qty = item.qty || item.tapas;
    const unit = item.qty ? "piezas" : "tapas";
    detail += `${item.name} x ${qty} ${unit}: $${item.price}\n`;
  });

  detail += `
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    MONTO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Subtotal: $${transaction.amount.toLocaleString("es-ES")}
    Comisión: ${(() => {
      if (transaction.provider === "mercadopago") return "2.9% + IVA";
      if (transaction.provider === "stripe") return "2.9% + $0.30";
      if (transaction.provider === "paypal") return "3.49% + $0.30";
      return "N/A";
    })()}
    
    Recibirás: $${Math.round(transaction.amount * 0.9649).toLocaleString("es-ES")}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    PAGO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Proveedor: ${transaction.provider.toUpperCase()}
    Estado: ${transaction.status.toUpperCase()}
    Se depositará en: ${PAYMENT_CONFIG.bankAccount.bank}
    Tiempo: 1-3 días hábiles

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;

  console.log(detail);
  alert(detail);
}

// ============ EXPORTAR DATOS ============

function exportTransactionsCSV() {
  const transactions = JSON.parse(
    localStorage.getItem("kdna_transactions") || "[]",
  );

  if (transactions.length === 0) {
    alert("No hay transacciones para exportar");
    return;
  }

  let csv = "Fecha,Cliente,Email,Monto,Proveedor,Estado,ID Transacción\n";
  transactions.forEach((trans) => {
    csv += `"${trans.timestamp}","${trans.customer.name}","${trans.customer.email}",${trans.amount},"${trans.provider}","${trans.status}","${trans.transactionId}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transacciones_kdna_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);

  alert(
    "Archivo descargado: transacciones_kdna_" +
      new Date().toISOString().split("T")[0] +
      ".csv",
  );
}

// ============ CONFIGURACIÓN DE PAGOS ============

function showPaymentSetup() {
  const setup = `
╔════════════════════════════════════════════════════════════╗
║          CONFIGURACIÓN ACTUAL DE PAGOS                    ║
╚════════════════════════════════════════════════════════════╝

PROVEEDOR: ${PAYMENT_CONFIG.provider.toUpperCase()}
${(() => {
  if (PAYMENT_CONFIG.provider === "demo") {
    return `
Status: 🔴 MODO DEMO (Pagos simulados, SIN dinero real)

Para activar pagos reales:
1. Ve a src/js/payments.js
2. Cambia: provider: "demo" → provider: "mercadopago"
3. Configura tus credenciales de API
    `;
  }
  if (PAYMENT_CONFIG.provider === "mercadopago") {
    return `
Status: 🟢 MERCADOPAGO ACTIVO (Pagos E DINERO REAL)

Public Key: ${PAYMENT_CONFIG.mercadopago.publicKey}

CUENTA BANCARIA:
Banco: ${PAYMENT_CONFIG.bankAccount.bank}
Cuenta: ${PAYMENT_CONFIG.bankAccount.accountNumber}
Titular: ${PAYMENT_CONFIG.bankAccount.accountHolder}
Tipo: ${PAYMENT_CONFIG.bankAccount.accountType}

Los pagos van DIRECTAMENTE a esta cuenta.
    `;
  }
  return "Proveedor no configurado";
})()}

╔════════════════════════════════════════════════════════════╗
║          PASO 1: CONFIGURAR MERCADOPAGO                   ║
╚════════════════════════════════════════════════════════════╝

1. Ve a https://www.mercadopago.com.co/
2. Crea cuenta o inicia sesión
3. Panel → Credenciales → Copia Public Key
4. Abre src/js/payments.js línea 9
5. Reemplaza el Public Key

╔════════════════════════════════════════════════════════════╗
║          PASO 2: ACTUALIZAR DATOS BANCARIOS               ║
╚════════════════════════════════════════════════════════════╝

Abre src/js/payments.js y busca "bankAccount":

const PAYMENT_CONFIG = {
  bankAccount: {
    bank: "BANCOLOMBIA",           // ← Tu banco
    accountNumber: "123456789",    // ← Tu número de cuenta
    accountHolder: "TU NOMBRE",    // ← Tu nombre completo
    accountType: "Corriente",      // ← O Ahorros
  },
};

⚠️ IMPORTANTE: Los datos deben coincidir con tu cuenta MercadoPago

╔════════════════════════════════════════════════════════════╗
║          PRUEBAS CON TARJETAS DEMO                        ║
╚════════════════════════════════════════════════════════════╝

Tarjetas de crédito de prueba (MercadoPago - Modo Test):

Visa: 4539999999999993
Mastercard: 5425233433010903
Amex: 378282246310005

Mes/Año: Cualquiera futuro (ej: 12/25)
CVV: Cualquier número 3-4 dígitos

Los pagos de prueba NO cobran dinero real.

╔════════════════════════════════════════════════════════════╗
║          FLUJO DE DINERO REAL                             ║
╚════════════════════════════════════════════════════════════╝

1. Cliente ingresa datos y tarjeta
2. Tu sitio envía a MercadoPago
3. MercadoPago valida tarjeta
4. Dinero → MercadoPago wallet
5. Menos comisión (2.9% + IVA)
6. Saldo transferido a tu banco
7. 1-3 días: Dinero en tu cuenta

COMISIÓN: 2.9% + IVA (≈3.51%)
Ejemplo: $100,000 → Recibes $96,490

╔════════════════════════════════════════════════════════════╗
║          ¡YA ESTÁ LISTO PARA PRODUCCIÓN!                 ║
╚════════════════════════════════════════════════════════════╝

✅ Sistema de pagos integrado
✅ Transacciones registradas automáticamente
✅ Recibos generados para clientes
✅ Dinero a tu banco en 1-3 días

Próximo paso: Elige proveedor (MercadoPago recomendado)
  `;

  console.log(setup);
  alert(setup);
}

// ============ RESUMEN DE PAGOS ============

function getPaymentSummary() {
  const transactions = JSON.parse(
    localStorage.getItem("kdna_transactions") || "[]",
  );

  const summary = {
    total_transactions: transactions.length,
    total_sales: transactions.reduce((sum, t) => sum + t.amount, 0),
    approved: transactions.filter((t) => t.status === "approved").length,
    failed: transactions.filter((t) => t.status === "failed").length,
    by_provider: {},
    by_status: {},
  };

  transactions.forEach((trans) => {
    summary.by_provider[trans.provider] =
      (summary.by_provider[trans.provider] || 0) + 1;
    summary.by_status[trans.status] =
      (summary.by_status[trans.status] || 0) + 1;
  });

  return summary;
}

// ============ ACCESO RÁPIDO EN CONSOLA ============

console.log(`
╔════════════════════════════════════════════╗
║  PANEL ADMINISTRATIVO - KD-NA PRODUCTOS   ║
╚════════════════════════════════════════════╝

Funciones disponibles en la consola (F12):

1. showTransactionsDashboard()
   → Ver todas las transacciones y ganancias

2. showPaymentSetup()
   → Ver instrucciones de configuración

3. getPaymentSummary()
   → Resumen rápido de ventas

4. exportTransactionsCSV()
   → Descargar transacciones en Excel

5. showWherePaymentsGo()
   → Ver a dónde van los pagos (desde payments.js)

6. getAccountInfo()
   → Ver información de cuenta bancaria

Ejemplo: Abre consola (F12) y escribe:
  showTransactionsDashboard()
`);
