/**
 * SISTEMA DE PAGOS - KD-NA PRODUCTOS
 *
 * OPCIONES DE PAGO SOPORTADAS:
 * 1. MercadoPago (RECOMENDADO - Colombia)
 * 2. Demo/Test Mode (para pruebas)
 *
 * CONFIGURACIÓN REQUERIDA:
 * Crea un archivo .env.local en la raíz con:
 * VITE_MERCADOPAGO_PUBLIC_KEY=tu_llave_publica
 * VITE_API_ENDPOINT=tu_backend_url
 */

// ============ CONFIGURACIÓN ============

const PAYMENT_CONFIG = {
  provider: "demo", // Cambiar a "mercadopago" cuando estés listo. Ver MERCADOPAGO_PASO_A_PASO.md
  mercadopago: {
    publicKey: "APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Tu llave pública
    // Obtén la llave en: https://www.mercadopago.com/developers/panel/credentials
  },
  bankAccount: {
    bank: "BANCOLOMBIA",
    accountNumber: "XXXXXXXXXXX",
    accountHolder: "KD-NA PRODUCTOS S.A.S.",
    accountType: "Corriente",
  },
};

// ============ PROCESAMIENTO DE PAGOS ============

/**
 * Procesar pago con MercadoPago
 * Retorna: { success: bool, transactionId: string, redirectUrl: string }
 */
async function processMercadoPagoPayment(orderData) {
  try {
    // En versión real, esto se hace en backend
    const paymentData = {
      transaction_amount: orderData.total,
      description: `Pedido KD-NA: ${orderData.items.map((i) => i.name).join(", ")}`,
      payment_method_id: "credit_card",
      payer: {
        email: orderData.customer.email,
        first_name: orderData.customer.name.split(" ")[0],
        last_name: orderData.customer.name.split(" ")[1] || "",
        identification: {
          type: "CC",
          number: "123456789", // En real, obtener del formulario
        },
      },
      items: orderData.items.map((item) => ({
        id: item.name,
        title: item.name,
        quantity: item.qty || item.tapas,
        unit_price: item.price,
      })),
      notification_url: "https://tudominio.com/webhook/payment",
    };

    console.log("Datos de pago enviados:", paymentData);

    // TODO: Enviar a tu backend para procesar con MercadoPago SDK
    // const response = await fetch('https://tu-backend.com/api/payments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(paymentData)
    // });

    return {
      success: true,
      transactionId: "TRANS-" + Date.now(),
      provider: "mercadopago",
      status: "approved",
    };
  } catch (error) {
    console.error("Error en MercadoPago:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Procesar pago con modo DEMO (para pruebas)
 */
async function processDemoPayment(orderData) {
  // Simular procesamiento
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% de éxito

      if (success) {
        resolve({
          success: true,
          transactionId: "DEMO-" + Date.now(),
          provider: "demo",
          status: "approved",
          message: "Pago procesado exitosamente (MODO DEMO)",
        });
      } else {
        resolve({
          success: false,
          error: "Pago rechazado (simulado)",
          provider: "demo",
        });
      }
    }, 2000); // Simular 2 segundos de procesamiento
  });
}

/**
 * Función principal de procesamiento de pagos
 */
async function processPayment(orderData) {
  console.log("🔄 Procesando pago...");
  console.log("Proveedor:", PAYMENT_CONFIG.provider);

  let result;

  if (PAYMENT_CONFIG.provider === "mercadopago") {
    result = await processMercadoPagoPayment(orderData);
  } else if (PAYMENT_CONFIG.provider === "demo") {
    result = await processDemoPayment(orderData);
  } else {
    result = {
      success: false,
      error: "Proveedor de pagos no configurado",
    };
  }

  return result;
}

/**
 * Generar recibo de pago
 */
function generatePaymentReceipt(order, paymentResult) {
  return {
    receiptId: "RCP-" + Date.now(),
    orderId: order.id,
    transactionId: paymentResult.transactionId,
    customer: order.customer.name,
    email: order.customer.email,
    items: order.items,
    subtotal: order.total,
    tax: 0,
    total: order.total,
    paymentMethod: "Tarjeta de Crédito",
    provider: paymentResult.provider,
    status: paymentResult.status,
    timestamp: new Date().toLocaleString("es-ES"),
    bankAccount: PAYMENT_CONFIG.bankAccount,
  };
}

/**
 * Enviar recibo por email (simulado)
 */
function sendPaymentReceipt(receipt) {
  console.log("📧 Enviando recibo de pago a:", receipt.email);
  console.log("Recibo:", receipt);

  // En real, esto se hace en backend
  // fetch('/api/send-receipt', { method: 'POST', body: JSON.stringify(receipt) })

  const emailContent = `
    ¡Hola ${receipt.customer}!

    Tu pago ha sido procesado exitosamente.

    DETALLES DE LA ORDEN
    ===================
    ID Orden: ${receipt.orderId}
    ID Transacción: ${receipt.transactionId}
    Fecha: ${receipt.timestamp}

    PRODUCTOS
    =========
    ${receipt.items
      .map(
        (item) => `- ${item.name} x ${item.qty || item.tapas}: $${item.price}`,
      )
      .join("\n")}

    TOTAL: $${receipt.total}

    Los fondos llegarán a tu cuenta bancaria en 1-3 días hábiles.

    Proveedor de Pago: ${receipt.provider.toUpperCase()}
    Estado: ${receipt.status.toUpperCase()}

    ¿Preguntas? Contacta a soporte@kdnaproductos.com
  `;

  return emailContent;
}

/**
 * Guardar transacción en base de datos
 */
function saveTransaction(order, paymentResult, receipt) {
  const transaction = {
    id: receipt.receiptId,
    orderId: order.id,
    userId: order.userId,
    transactionId: paymentResult.transactionId,
    amount: order.total,
    provider: paymentResult.provider,
    status: paymentResult.status,
    items: order.items,
    customer: order.customer,
    timestamp: new Date().toISOString(),
    accountTo: PAYMENT_CONFIG.bankAccount.accountNumber,
  };

  // Guardar en localStorage (en real, guardar en backend)
  let transactions = JSON.parse(
    localStorage.getItem("kdna_transactions") || "[]",
  );
  transactions.push(transaction);
  localStorage.setItem("kdna_transactions", JSON.stringify(transactions));

  console.log("✅ Transacción guardada:", transaction);

  return transaction;
}

/**
 * Obtener configuración de cuenta bancaria
 * (Para mostrar al usuario dónde irán sus fondos)
 */
function getAccountInfo() {
  return {
    bankName: PAYMENT_CONFIG.bankAccount.bank,
    accountNumber: PAYMENT_CONFIG.bankAccount.accountNumber,
    holder: PAYMENT_CONFIG.bankAccount.accountHolder,
    type: PAYMENT_CONFIG.bankAccount.accountType,
    depositTime: "1-3 días hábiles",
    message: "Los pagos se acreditarán automáticamente en esta cuenta",
  };
}

/**
 * Mostrar información de donde van los pagos
 */
function showWherePaymentsGo() {
  const accountInfo = getAccountInfo();

  const info = `
    💰 INFORMACIÓN DE DEPÓSITO

    Los pagos de tus clientes irán directamente a:

    Banco: ${accountInfo.bankName}
    Número de Cuenta: ${accountInfo.accountNumber}
    Titular: ${accountInfo.holder}
    Tipo: ${accountInfo.type}

    ⏱️  Tiempo de transferencia: ${accountInfo.depositTime}

    Cada transacción se registra automaticamente y recibirás
    notificaciones por email de cada pago recibido.
  `;

  return info;
}

// Exportar para uso en otros archivos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    processPayment,
    generatePaymentReceipt,
    sendPaymentReceipt,
    saveTransaction,
    getAccountInfo,
    showWherePaymentsGo,
    PAYMENT_CONFIG,
  };
}
