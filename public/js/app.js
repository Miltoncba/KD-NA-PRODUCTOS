// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Actualizar navbar con autenticación
  updateNavbarAuth();

  // Footer dinámico
  document.getElementById("footer").innerHTML = `
    <p>&copy; 2026 KD-NA PRODUCTOS - Todos los derechos reservados</p>
  `;

  renderCatalog();
  setupTabsAndIntro();

  // Scroll listener para mostrar/ocultar logo sticky
  window.addEventListener("scroll", function () {
    const scrollLogo = document.getElementById("scroll-logo");
    if (window.scrollY > 100) {
      scrollLogo.classList.add("active");
    } else {
      scrollLogo.classList.remove("active");
    }
  });

  // Controlar animación del splash screen
  setTimeout(() => {
    hideSplashScreen();
  }, 2000); // Desaparecerá después de 2 segundos
});

// Ocultar pantalla de splash
function hideSplashScreen() {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    splash.style.display = "none";
  }
}

// Configurar tabs y intro
function setupTabsAndIntro() {
  // Tabs del checkout
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Mostrar intro al cargar
  setTimeout(() => {
    showIntro();
  }, 500);
}

function switchTab(tabId) {
  // Remover active de todos los tabs y botones
  document.querySelectorAll(".tab-content").forEach((el) => {
    el.style.display = "none";
    el.classList.remove("active");
  });
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Activar el tab seleccionado
  const tabContent = document.getElementById(tabId);
  if (tabContent) {
    tabContent.style.display = "block";
    tabContent.classList.add("active");
  }

  // Activar botón
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
}

function showIntro() {
  const modal = document.getElementById("intro-modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeIntro() {
  const modal = document.getElementById("intro-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Catálogo inicial con reglas de mayoreo
const products = [
  {
    name: "Carbón",
    price: 100,
    wholesale: 43,
    wholesaleQty: 10,
    emoji: "🪨",
    type: "normal",
  },
  {
    name: "Cerveza",
    price: 600,
    wholesale: 480,
    wholesaleQty: 1,
    emoji: "🍺",
    type: "beer",
    brands: [
      { name: "Tecate Light", id: "tecate-light" },
      { name: "Tecate Rojo", id: "tecate-rojo" },
      { name: "Indio", id: "indio" },
    ],
    piecesPerTapa: 24,
  },
  {
    name: "Hielo",
    price: 15,
    wholesale: 12,
    wholesaleQty: 20,
    emoji: "🧊",
    type: "normal",
  },
];

function renderCatalog() {
  const catalog = document.getElementById("catalog");
  if (!catalog) return;

  catalog.innerHTML = products
    .map((p) => {
      if (p.type === "beer") {
        // Renderizar cerveza con selector de marca
        return `
    <div class="product-card">
      <div class="product-emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p class="price">Precio: $${p.price} por tapa (24 piezas)</p>
      <div class="beer-brands">
        ${p.brands
          .map(
            (brand) => `
          <button class="brand-btn" onclick="selectBeerBrand('${brand.name}', '${brand.id}', '${p.name}')">
            ${brand.name}
          </button>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
      } else {
        // Renderizar productos normales
        return `
    <div class="product-card">
      <div class="product-emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p class="price">Precio normal: $${p.price}</p>
      <p class="wholesale">Mayoreo: $${p.wholesale} c/u desde ${p.wholesaleQty} piezas</p>
      <button onclick="addToCart('${p.name}')">Agregar al carrito</button>
    </div>
  `;
      }
    })
    .join("");
}

function openCatalog() {
  const catalog = document.getElementById("catalog");
  if (catalog) {
    catalog.scrollIntoView({ behavior: "smooth" });
  }
}

function selectBeerBrand(brandName, brandId, productName) {
  // Guardar la marca seleccionada para usar en el carrito
  window.selectedBeerBrand = {
    name: brandName,
    id: brandId,
    productName: productName,
  };

  // Abrir modal de cantidad para cervezas
  openBeerQuantityModal(brandName);
}

function openBeerQuantityModal(brandName) {
  isBeerId = true; // Marcar que es cerveza
  const quantityModal = document.getElementById("quantity-modal");
  const productNameSpan = document.getElementById("qty-product-name");
  const quantityButtons = document.querySelector(".quantity-buttons");
  const customQtyLabel = document.getElementById("custom-qty-label");
  const customInput = document.getElementById("custom-quantity");
  const confirmBtn = document.getElementById("confirm-custom-btn");

  if (quantityModal && productNameSpan) {
    productNameSpan.innerText = `${brandName} (por tapas)`;

    // Cambiar botones a tapas (1-10 tapas = 24-240 piezas)
    quantityButtons.innerHTML = `
      <button class="qty-option" onclick="confirmBeerQuantity(1)">1 tapa</button>
      <button class="qty-option" onclick="confirmBeerQuantity(2)">2 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(3)">3 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(4)">4 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(5)">5 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(6)">6 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(7)">7 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(8)">8 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(9)">9 tapas</button>
      <button class="qty-option" onclick="confirmBeerQuantity(10)">10 tapas</button>
    `;

    // Modificar campo personalizado para cerveza
    if (customQtyLabel)
      customQtyLabel.innerText = "O ingresa otra cantidad (máx. 10 tapas):";
    if (customInput) {
      customInput.placeholder = "Cantidad de tapas";
      customInput.value = "";
      customInput.max = "10";
    }
    if (confirmBtn) confirmBtn.innerText = "Agregar al carrito";

    quantityModal.style.display = "flex";
  }
}

function confirmBeerQuantity(tapas) {
  if (window.selectedBeerBrand) {
    addBeerToCart(window.selectedBeerBrand, tapas);
    closeQuantityModal();
  }
}

function confirmCustomBeerQuantity() {
  const customQty = parseInt(document.getElementById("custom-quantity").value);

  if (!customQty || customQty < 1 || customQty > 10) {
    alert("Por favor ingresa una cantidad entre 1 y 10 tapas");
    return;
  }

  if (window.selectedBeerBrand) {
    addBeerToCart(window.selectedBeerBrand, customQty);
    closeQuantityModal();
  }
}

// Función para actualizar el resumen en el modal
function updateOrderSummary() {
  let summary = "<h4>📦 Resumen de tu Pedido</h4>";
  let total = 0;

  if (typeof cart !== "undefined" && cart.length > 0) {
    cart.forEach((p) => {
      let unitPrice = p.price;
      if (p.qty >= p.wholesaleQty) {
        unitPrice = p.wholesale;
      }
      const itemTotal = unitPrice * p.qty;
      total += itemTotal;
      summary += `<div class="order-item"><span>${p.name} x${p.qty}</span><span>$${itemTotal}</span></div>`;
    });

    summary += `<div class="order-total">Total: $${total}</div>`;
  }

  const orderSummaryEl = document.getElementById("order-summary");
  if (orderSummaryEl) {
    orderSummaryEl.innerHTML = summary;
  }
}
