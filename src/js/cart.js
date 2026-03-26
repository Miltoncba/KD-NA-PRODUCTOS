let cart = [];
let orders = [];
let pendingProduct = null; // Para guardar el producto en espera
let isBeerId = false; // Para saber si es cerveza

function addToCart(productName) {
  pendingProduct = productName;
  isBeerId = false;
  const quantityModal = document.getElementById("quantity-modal");
  const productNameSpan = document.getElementById("qty-product-name");
  const quantityButtons = document.querySelector(".quantity-buttons");
  const customQtyLabel = document.getElementById("custom-qty-label");
  const confirmBtn = document.getElementById("confirm-custom-btn");

  if (quantityModal && productNameSpan && quantityButtons) {
    productNameSpan.innerText = productName;

    // Generar botones normales de cantidad
    quantityButtons.innerHTML = `
      <button class="qty-option" onclick="confirmQuantity(10)">10</button>
      <button class="qty-option" onclick="confirmQuantity(20)">20</button>
      <button class="qty-option" onclick="confirmQuantity(30)">30</button>
      <button class="qty-option" onclick="confirmQuantity(40)">40</button>
      <button class="qty-option" onclick="confirmQuantity(50)">50</button>
      <button class="qty-option" onclick="confirmQuantity(60)">60</button>
      <button class="qty-option" onclick="confirmQuantity(70)">70</button>
      <button class="qty-option" onclick="confirmQuantity(80)">80</button>
      <button class="qty-option" onclick="confirmQuantity(90)">90</button>
      <button class="qty-option" onclick="confirmQuantity(100)">100</button>
    `;

    // Reset campos
    document.getElementById("custom-quantity").value = "";
    document.getElementById("custom-quantity").max = "200";
    document.getElementById("custom-quantity").placeholder = "Cantidad";
    if (customQtyLabel)
      customQtyLabel.innerText = "O ingresa otra cantidad (máx. 200):";
    if (confirmBtn) confirmBtn.innerText = "Agregar al carrito";

    quantityModal.style.display = "flex";
  }
}

function addBeerToCart(beerBrand, tapas) {
  // Convertir tapas a piezas (24 piezas por tapa)
  const piecesPerTapa = 24;
  const totalPieces = tapas * piecesPerTapa;

  // Crear nombre único para cada marca de cerveza
  const productName = `${beerBrand.productName} - ${beerBrand.name}`;

  const product = {
    name: productName,
    displayName: `${beerBrand.name}`,
    price: 600,
    wholesale: 480,
    wholesaleQty: 1,
    emoji: "🍺",
    type: "beer",
    brand: beerBrand.name,
    qty: tapas,
    tapas: tapas,
    originalPrice: 600 * tapas, // Precio por tapa
  };

  const item = cart.find((i) => i.name === productName);

  if (item) {
    item.qty += tapas;
    item.tapas = item.qty;
  } else {
    cart.push(product);
  }

  updateCartCount();
  renderCart();
}

function confirmQuantity(qty) {
  if (pendingProduct) {
    addProductToCart(pendingProduct, qty);
    closeQuantityModal();
  }
}

function confirmCustomQuantity() {
  const customQty = parseInt(document.getElementById("custom-quantity").value);

  if (isBeerId) {
    // Para cervezas
    if (!customQty || customQty < 1 || customQty > 10) {
      alert("Por favor ingresa una cantidad entre 1 y 10 tapas");
      return;
    }
  } else {
    // Para productos normales
    if (!customQty || customQty < 1 || customQty > 200) {
      alert("Por favor ingresa una cantidad entre 1 y 200");
      return;
    }
  }

  if (isBeerId) {
    if (window.selectedBeerBrand) {
      confirmCustomBeerQuantity.call(this);
    }
  } else {
    if (pendingProduct) {
      addProductToCart(pendingProduct, customQty);
      closeQuantityModal();
    }
  }
}

function closeQuantityModal() {
  const quantityModal = document.getElementById("quantity-modal");
  if (quantityModal) {
    quantityModal.style.display = "none";
  }
  pendingProduct = null;
}

function addProductToCart(productName, qty) {
  const product = products.find((p) => p.name === productName);
  const item = cart.find((i) => i.name === productName);

  if (item) {
    item.qty += qty;
    // Limitar a 200 piezas máximo
    if (item.qty > 200) item.qty = 200;
  } else {
    cart.push({ ...product, qty: qty });
  }
  updateCartCount();
  renderCart();
}

function changeQty(productName, delta) {
  const item = cart.find((i) => i.name === productName);
  if (!item) return;

  // Para cervezas, cambiar por tapas; para otros, por piezas
  if (item.type === "beer") {
    item.qty += delta;
    item.tapas = item.qty;
    // Limitar a 10 tapas máximo
    if (item.qty > 10) item.qty = item.tapas = 10;
  } else {
    item.qty += delta;
    // Limitar a 200 piezas máximo
    if (item.qty > 200) item.qty = 200;
  }

  if (item.qty <= 0) {
    cart = cart.filter((i) => i.name !== productName);
  }

  updateCartCount();
  renderCart();
}

function removeFromCart(productName) {
  cart = cart.filter((i) => i.name !== productName);
  updateCartCount();
  renderCart();
}

function calculateTotal() {
  let total = 0;
  cart.forEach((p) => {
    let unitPrice = p.price;
    // Solo aplicar descuento de mayoreo si qty >= 10
    if (p.qty >= 10) {
      unitPrice = p.wholesale;
    }
    total += unitPrice * p.qty;
  });
  return total;
}

function renderCart() {
  const cartPanel = document.getElementById("cart-panel");
  if (!cartPanel) return;

  if (cart.length === 0) {
    cartPanel.innerHTML = "<h2>Carrito vacío</h2>";
    return;
  }

  let total = 0;

  cartPanel.innerHTML = `
    <h2>Carrito de compras</h2>
    <ul>
      ${cart
        .map((p) => {
          let unitPrice = p.price;
          let displayQty = p.qty;
          let qtyLabel = "piezas";

          // Manejo especial para cervezas
          if (p.type === "beer") {
            unitPrice = p.price; // $600 por tapa
            displayQty = p.tapas; // Mostrar tapas
            qtyLabel = "tapa(s)";
            total += unitPrice * displayQty;
          } else {
            // Para productos normales
            if (p.qty >= 10) {
              unitPrice = p.wholesale;
            }
            total += unitPrice * p.qty;
          }

          // Mostrar mensaje si aplica mayoreo (solo para productos normales)
          let wholesaleMsg = "";
          if (p.type !== "beer") {
            if (p.qty >= 10) {
              wholesaleMsg = `<span style="color:#28a745;font-size:0.8rem;">✓ Precio de mayoreo aplicado</span>`;
            } else if (p.qty < 10) {
              const remaining = 10 - p.qty;
              wholesaleMsg = `<span style="color:#ff9800;font-size:0.8rem;">Falta ${remaining} para mayoreo</span>`;
            }
          }

          return `
          <li>
            <div>
              ${p.displayName || p.name} - $${unitPrice} x ${displayQty} ${qtyLabel} ${wholesaleMsg}
            </div>
            <div>
              <button class="qty-btn" onclick="changeQty('${p.name}', ${p.type === "beer" ? 1 : 1})">+</button>
              <button class="qty-btn" onclick="changeQty('${p.name}', ${p.type === "beer" ? -1 : -1})">-</button>
              <button class="remove-btn" onclick="removeFromCart('${p.name}')">Eliminar</button>
            </div>
          </li>
        `;
        })
        .join("")}
    </ul>
    <p class="cart-total">Total: $${total}</p>
    <button onclick="openCheckout()" class="checkout-btn">Realizar Pedido</button>
  `;
}

function openCheckout() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  // Verificar si usuario está autenticado
  if (!currentUser) {
    alert("Debes iniciar sesión para hacer un pedido");
    openLoginModal();
    return;
  }

  // Actualizar resumen
  updateOrderSummary();

  // Reset de tabs
  switchTab("personal");

  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

async function processCheckout() {
  // Obtener datos del formulario
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  const deliveryType = document.querySelector(
    'input[name="delivery"]:checked',
  ).value;

  // Datos de tarjeta
  const cardName = document.getElementById("card-name").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const cardExpiry = document.getElementById("card-expiry").value.trim();
  const cardCVV = document.getElementById("card-cvv").value.trim();

  // Validaciones
  if (!name || !phone || !email || !address) {
    alert("Por favor completa todos los datos del cliente");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Por favor ingresa un correo válido");
    return;
  }

  if (!phone.match(/^\d{7,}$/)) {
    alert("Por favor ingresa un teléfono válido");
    return;
  }

  if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
    alert("Por favor completa todos los datos de la tarjeta");
    return;
  }

  if (!cardNumber.match(/^\d{13,19}$/)) {
    alert("Número de tarjeta inválido (13-19 dígitos)");
    return;
  }

  if (!cardCVV.match(/^\d{3,4}$/)) {
    alert("CVV inválido (3-4 dígitos)");
    return;
  }

  // Crear orden (estructura base)
  const order = {
    id: "ORD-" + Date.now(),
    date: new Date().toLocaleString("es-ES"),
    userId: currentUser.id,
    customer: {
      name: name,
      phone: phone,
      email: email,
      address: address,
    },
    deliveryType: deliveryType,
    items: [...cart],
    total: calculateTotal(),
    status: "procesando",
    cardLast4: cardNumber.slice(-4),
  };

  // Mostrar estado de procesamiento
  const confirmBtn = document.getElementById("confirm-checkout-btn");
  const originalText = confirmBtn.innerText;
  confirmBtn.disabled = true;
  confirmBtn.innerText = "🔄 Procesando pago...";

  try {
    // Procesar pago
    console.log("💳 Iniciando procesamiento de pago...");
    const paymentResult = await processPayment(order);

    if (paymentResult.success) {
      // Pago exitoso
      order.status = "pagado";
      order.transactionId = paymentResult.transactionId;
      order.paymentProvider = paymentResult.provider;

      // Guardar orden en historial global
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Guardar orden en historial del usuario
      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex].orders.push(order);
        saveUsers();
      }

      // Generar recibo
      const receipt = generatePaymentReceipt(order, paymentResult);
      sendPaymentReceipt(receipt);
      saveTransaction(order, paymentResult, receipt);

      // Mostrar información de depósito
      const accountInfo = getAccountInfo();
      alert(
        `¡Pago procesado exitosamente! 🎉\n\n` +
          `ID de Orden: ${order.id}\n` +
          `Transacción: ${paymentResult.transactionId}\n` +
          `Total: $${order.total}\n\n` +
          `Los fondos se depositarán en:\n` +
          `Banco: ${accountInfo.bankName}\n` +
          `Cuenta: ...${accountInfo.accountNumber.slice(-4)}\n` +
          `En: ${accountInfo.depositTime}\n\n` +
          `Tu pedido llegará ${getDeliveryLabel(deliveryType)}\n` +
          `Te enviaremos un email con todos los detalles.`,
      );

      // Limpiar carrito
      cart = [];
      updateCartCount();
      renderCart();
      closeCheckout();
    } else {
      // Pago fallido
      console.error("❌ Error en pago:", paymentResult.error);
      alert(
        `❌ Error al procesar el pago:\n\n${paymentResult.error}\n\nPor favor intenta de nuevo.`,
      );
      order.status = "fallido";
    }
  } catch (error) {
    console.error("Error crítico:", error);
    alert("Error crítico al procesar el pago. Por favor intenta de nuevo.");
    order.status = "error";
  } finally {
    // Restaurar botón
    confirmBtn.disabled = false;
    confirmBtn.innerText = originalText;
  }
}

function getDeliveryLabel(type) {
  return type === "delivery" ? "a domicilio" : "en tienda";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toggleCart() {
  const cartPanel = document.getElementById("cart-panel");
  cartPanel.style.display =
    cartPanel.style.display === "block" ? "none" : "block";
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cart.reduce((sum, p) => sum + p.qty, 0);
  }
}

// Cargar órdenes guardadas
function loadOrders() {
  const saved = localStorage.getItem("orders");
  if (saved) {
    orders = JSON.parse(saved);
  }
}

// Cerrar modal al hacer click fuera
window.onclick = function (event) {
  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal && event.target == checkoutModal) {
    checkoutModal.style.display = "none";
  }

  const quantityModal = document.getElementById("quantity-modal");
  if (quantityModal && event.target == quantityModal) {
    quantityModal.style.display = "none";
    pendingProduct = null;
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  loadOrders();
  renderCart();
});
