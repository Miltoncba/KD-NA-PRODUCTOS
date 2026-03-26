// Sistema de Autenticación
let currentUser = null;
let users = [];

// Cargar usuarios guardados
function loadUsers() {
  const saved = localStorage.getItem("kdna_users");
  if (saved) {
    users = JSON.parse(saved);
  }
}

// Guardar usuarios
function saveUsers() {
  localStorage.setItem("kdna_users", JSON.stringify(users));
}

// Verificar si hay sesión activa
function checkSession() {
  const session = localStorage.getItem("kdna_session");
  if (session) {
    const sessionData = JSON.parse(session);
    currentUser = sessionData;
    updateNavbarAuth();
    return true;
  }
  return false;
}

// Encriptación simple (para MVP - en producción usar bcrypt)
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
}

// Registrar usuario
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const phone = document.getElementById("register-phone").value.trim();
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;
  const errorDiv = document.getElementById("register-error");

  // Validaciones
  if (!name || !email || !phone || !password || !confirm) {
    errorDiv.textContent = "Por favor completa todos los campos";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (password !== confirm) {
    errorDiv.textContent = "Las contraseñas no coinciden";
    return;
  }

  // Verificar si el email ya existe
  if (users.find((u) => u.email === email)) {
    errorDiv.textContent = "Este correo ya está registrado";
    return;
  }

  // Crear usuario
  const newUser = {
    id: "USER-" + Date.now(),
    name: name,
    email: email,
    phone: phone,
    password: hashPassword(password),
    createdAt: new Date().toLocaleString("es-ES"),
    orders: [],
  };

  users.push(newUser);
  saveUsers();

  // Iniciar sesión automáticamente
  currentUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  };

  localStorage.setItem("kdna_session", JSON.stringify(currentUser));
  alert(`¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`);
  closeAuthModal();
  updateNavbarAuth();
}

// Iniciar sesión
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  // Buscar usuario
  const user = users.find((u) => u.email === email);

  if (!user) {
    errorDiv.textContent = "Correo o contraseña incorrectos";
    return;
  }

  // Verificar contraseña
  if (user.password !== hashPassword(password)) {
    errorDiv.textContent = "Correo o contraseña incorrectos";
    return;
  }

  // Iniciar sesión
  currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  localStorage.setItem("kdna_session", JSON.stringify(currentUser));
  alert(`¡Bienvenido ${user.name}!`);
  closeAuthModal();
  updateNavbarAuth();
}

// Cerrar sesión
function logout() {
  currentUser = null;
  localStorage.removeItem("kdna_session");
  cart = [];
  updateNavbarAuth();
  renderCart();
  alert("Has cerrado sesión");
}

// Actualizar navbar con info de auth
function updateNavbarAuth() {
  const navBar = document.getElementById("navbar");
  if (!navBar) return;

  let authHTML = `
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#catalog">Catálogo</a></li>
        <li><a href="#cart">Carrito</a></li>
  `;

  if (currentUser) {
    authHTML += `
        <li class="user-menu">
          <a href="#" onclick="toggleUserMenu(event)">👤 ${currentUser.name}</a>
          <div class="user-dropdown" id="user-dropdown" style="display: none;">
            <a href="#" onclick="showUserProfile()">Mi Perfil</a>
            <a href="#" onclick="showMyOrders()">Mis Pedidos</a>
            <a href="#" onclick="logout()">Cerrar Sesión</a>
          </div>
        </li>
    `;
  } else {
    authHTML += `
        <li><a href="#" onclick="openLoginModal()">Inicia Sesión</a></li>
        <li><a href="#" onclick="openRegisterModal()">Regístrate</a></li>
    `;
  }

  authHTML += `
      </ul>
    </nav>
  `;

  navBar.innerHTML = authHTML;
}

// Abrir modal login
function openLoginModal() {
  document.getElementById("login-modal").style.display = "flex";
  document.getElementById("register-modal").style.display = "none";
  document.getElementById("login-error").textContent = "";
  document.getElementById("login-form").reset();
}

// Abrir modal registro
function openRegisterModal() {
  document.getElementById("register-modal").style.display = "flex";
  document.getElementById("login-modal").style.display = "none";
  document.getElementById("register-error").textContent = "";
  document.getElementById("register-form").reset();
}

// Switch a login
function switchToLogin(event) {
  event.preventDefault();
  openLoginModal();
}

// Switch a registro
function switchToRegister(event) {
  event.preventDefault();
  openRegisterModal();
}

// Cerrar modal auth
function closeAuthModal() {
  document.getElementById("login-modal").style.display = "none";
  document.getElementById("register-modal").style.display = "none";
}

// Toggle menú usuario
function toggleUserMenu(event) {
  event.preventDefault();
  const menu = document.getElementById("user-dropdown");
  if (menu) {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }
}

// Mostrar perfil usuario
function showUserProfile() {
  if (!currentUser) {
    alert("Debes iniciar sesión");
    return;
  }

  // Obtener usuario completo
  const userdata = users.find((u) => u.id === currentUser.id);

  const profileInfo = `
    Nombre: ${userdata.name}
    Email: ${userdata.email}
    Teléfono: ${userdata.phone}
    Miembro desde: ${userdata.createdAt}
    Pedidos realizados: ${userdata.orders.length}
  `;

  alert("Perfil de Usuario:\n\n" + profileInfo);
}

// Mostrar mis pedidos
function showMyOrders() {
  if (!currentUser) {
    alert("Debes iniciar sesión");
    return;
  }

  const userdata = users.find((u) => u.id === currentUser.id);

  if (userdata.orders.length === 0) {
    alert("No tienes pedidos realizados aún");
    return;
  }

  let ordersInfo = "Tus Pedidos:\n\n";
  userdata.orders.forEach((order, i) => {
    ordersInfo += `${i + 1}. Orden ${order.id}\n   Fecha: ${order.date}\n   Total: $${order.total}\n   Estado: ${order.status}\n\n`;
  });

  alert(ordersInfo);
}

// Cerrar menú al hacer click fuera
document.addEventListener("click", function (event) {
  const userMenu = document.getElementById("user-dropdown");
  const userLink = event.target.closest(".user-menu");

  if (userMenu && !userLink) {
    userMenu.style.display = "none";
  }
});

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
  checkSession();
});
