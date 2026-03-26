# 🚀 GUÍA RÁPIDA: SUBIR KDNA A NETLIFY (15 MINUTOS)

## ✅ PASO 1: Git Configurado Localmente

Tu proyecto ya está listo con Git. Hemos hecho:

```
✅ Repositorio Git inicializado
✅ Archivos agregados (.git/add .)
✅ Primer commit realizado
✅ .gitignore creado
```

---

## PASO 2: Crear Cuenta en GitHub (5 MINUTOS)

### 2.1. Ve a GitHub

1. Abre: https://github.com/signup
2. Completa el formulario:
   ```
   Email:              tu_email@gmail.com
   Contraseña:         Tu_Contraseña_123
   Nombre de usuario:  kdnaproductos  (o similar)
   ```
3. Haz clic en **"Create account"**

### 2.2. Verifica tu email

1. GitHub te envía un email de verificación
2. Abre tu email
3. Haz clic en "Verify email address"
4. ¡Listo! Cuenta confirmada

---

## PASO 3: Crear Repositorio en GitHub (3 MINUTOS)

### 3.1. Crear nuevo repositorio

1. Inicia sesión en GitHub: https://github.com/
2. Haz clic en el **"+"** arriba a la derecha
3. Selecciona **"New repository"**

### 3.2. Configurar repositorio

Completa los datos:

```
Repository name:        kdna-productos
Description:            E-commerce platform for KD-NA PRODUCTOS
Visibility:             Public  (importante para Netlify gratis)
Initialize:             NO checkear (ya tienes Git local)
```

Haz clic en **"Create repository"**

### 3.3. Copiar la URL

GitHub te muestra una pantalla con:

```
…or push an existing repository from the command line

git remote add origin https://github.com/TU_USUARIO/kdna-productos.git
git branch -M main
git push -u origin main
```

**Copia la URL**. La necesitarás en el próximo paso.

---

## PASO 4: Conectar tu Código Local a GitHub (3 MINUTOS)

### En PowerShell, ejecuta estos comandos:

```powershell
# Ir a la carpeta del proyecto
cd "C:\FlutterProjects\KD-NA PRODUCTOS"

# Agregar remoto (reemplaza con TU URL):
git remote add origin https://github.com/TU_USUARIO/kdna-productos.git

# Cambiar rama a "main"
git branch -M main

# Subir código a GitHub
git push -u origin main
```

**Nota**: Te pedirá autenticación. Sigue estas opciones:

#### OPCIÓN A: Token Personal (Recomendado)

1. En GitHub: Settings → Developer settings → Personal access tokens → Generate new token
2. Selecciona `repo` (acceso completo a repositorios)
3. Haz clic en "Generate token"
4. **Copia el token** (se ve como: `ghp_xxxxxxxxxxxxx`)
5. En PowerShell, cuando pida contraseña, pega el token

#### OPCIÓN B: Autenticación de GitHub Desktop

Si tienes dudas, GitHub Desktop hace esto automáticamente:

1. Descarga: https://desktop.github.com/
2. Abre, selecciona tu repositorio
3. Haz clic en "Publish"

---

## PASO 5: Conectar a Netlify y Deploy (3 MINUTOS)

### 5.1. Crear cuenta en Netlify

1. Abre: https://netlify.com
2. Haz clic en **"Sign up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Netlify a acceder tu GitHub

### 5.2. Crear sitio desde repositorio

1. En Netlify dashboard, haz clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Conecta con GitHub
4. Selecciona tu repositorio: `kdna-productos`

### 5.3. Configurar deploy

Netlify te pide:

```
Base directory:    (dejar en blanco o .)
Build command:     (dejar en blanco, no hay build)
Publish directory: public
```

¡Esto es IMPORTANTE! La carpeta `public/` es donde está tu `index.html`.

Haz clic en **"Deploy site"**

### 5.4. ¡Deploy iniciado!

Netlify automáticamente:

1. ✅ Descarga tu código de GitHub
2. ✅ Lee la configuración
3. ✅ Publica la carpeta `public/`
4. ✅ Te da una URL

**Espera 1-2 minutos...**

---

## PASO 6: ¡TU SITIO ESTÁ EN VIVO! 🎉

Después de 1-2 minutos, verás:

```
Site name: kdna-productos-RANDOM.netlify.app
URL:       https://kdna-productos-RANDOM.netlify.app
Status:    Published ✅
```

**Abre la URL y verifica que todo funciona:**

- ✅ Se ve el splash screen
- ✅ Se ve el catálogo
- ✅ El carrito funciona
- ✅ Puedo hacer login/registro
- ✅ Puedo hacer una compra

---

## 🎨 (OPCIONAL) Configurar dominio personalizado

Si quieres que el sitio sea `kdna-productos.com` en lugar de `kdna-productos-random.netlify.app`:

### Opción 1: Dominio gratis de Netlify (recomendado)

1. En Netlify → Site settings → Domain management
2. Haz clic en "Add custom domain"
3. Pon: `kdna.netlify.app`
4. ¡Listo! Gratis y funciona inmediatamente

### Opción 2: Dominio personalizado

Si compras `kdna-productos.com`:

1. En Netlify → Domain management → Add custom domain
2. Pon: `kdna-productos.com`
3. Netlify te da instrucciones para cambiar DNS en tu proveedor
4. 24-48 horas: Dominio funciona

---

## 🔄 DESPLEGAR CAMBIOS FUTUROS

Cada vez que hagas cambios:

```powershell
# 1. Haz cambios en tu código

# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "Descripción del cambio"

# 4. Pushear a GitHub
git push

# 5. Netlify automáticamente redeploy
# (En 30 segundos tu sitio está actualizado)
```

---

## ✅ CHECKLIST FINAL

- [ ] Cuenta GitHub creada
- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub
- [ ] Cuenta Netlify creada
- [ ] Sitio conectado a Netlify
- [ ] Deploy completado
- [ ] Sitio en vivo (puedo abrir URL)
- [ ] Carrito funciona
- [ ] Pagos funcionan
- [ ] Login funciona

---

## 🎯 RESULTADO FINAL

```
🌐 Tu sitio está EN VIVO en:
   https://kdna-productos-XXXX.netlify.app

💳 Aceptas pagos automáticamente

📊 Cada vez que vendas:
   1. Cliente paga en tu sitio
   2. Dinero va a MercadoPago
   3. MercadoPago transfiere a tu banco
   4. Dinero en tu cuenta en 1-3 días

🎉 ¡Estás en producción!
```

---

## ❓ PROBLEMAS COMUNES

### "No puede encontrar la carpeta public/"

**Solución**: En Netlify, asegúrate que "Publish directory" es `public`

### "El sitio muestra páginas en blanco"

**Solución**: Asegúrate que el archivo `index.html` está en `public/`

### "No me deja pushear a GitHub"

**Opciones**:

1. Crea Personal Access Token (arriba)
2. O usa GitHub Desktop (más fácil)

### "MercadoPago no funciona"

**Recuerda**: Está en "demo" mode. Para dinero real, actualiza:

```
Ver: MERCADOPAGO_PASO_A_PASO.md
```

---

## 📚 SIGUIENTES PASOS

1. ✅ Sube a Netlify (AHORA)
2. ✅ Verifica que funciona
3. ✅ Prueba una compra
4. ✅ Lee `MERCADOPAGO_PASO_A_PASO.md` para pagos reales
5. ✅ Configura tu dominio personalizado (opcional)

---

**¡Tu tienda KD-NA PRODUCTOS está EN VIVO! 🚀**
