# 🛒 Sistema de Carrito Funcional - KD-NA PRODUCTOS

## ✨ Características Implementadas

### 1. **Carrito de Compras Funcional**

- Agregar productos al carrito desde el catálogo
- Aumentar/disminuir cantidades
- Eliminar productos
- Contador de artículos en tiempo real
- Cálculo automático de precios (detalle y mayoreo)

### 2. **Sistema de Precios Inteligente**

- **Precio detalle**: Para cantidades menores
- **Precio mayoreo**: Se aplica automáticamente cuando se llega a cantidad mínima
- **Descuentos automáticos**: Por volumen de compra

### 3. **Formulario de Checkout Completo**

**a) Información Personal:**

- Nombre completo
- Teléfono (validación de formato)
- Correo electrónico (validación de email)
- Dirección

**b) Tipo de Entrega:**

- 🚗 **A Domicilio**: Entrega en la dirección indicada
- 🏪 **Recoger en Tienda**: Retiro en sucursal

**c) Información de Pago:**

- Nombre en la tarjeta
- Número de tarjeta (13-19 dígitos)
- Vencimiento (MM/AA)
- CVV (3-4 dígitos)

### 4. **Validaciones Implementadas**

✓ Campos requeridos completos
✓ Email válido
✓ Teléfono con mínimo 7 dígitos
✓ Número de tarjeta 13-19 dígitos
✓ CVV 3-4 dígitos
✓ Formato de vencimiento MM/AA

### 5. **Procesamiento de Pedidos**

- ID de orden única (ORD-[timestamp])
- Fecha y hora de compra automática
- Guardado en localStorage para persistencia
- Confirmación visual del pedido

## 🎯 Cómo Usar

### Usuario Final:

1. Click en **"Haz tu pedido ahora"** o desplázate al catálogo
2. Haz click en **"Agregar al carrito"** en los productos deseados
3. Click en el icono 🛒 (esquina superior derecha) para ver el carrito
4. Haz click en **"Realizar Pedido"**
5. Complete el formulario con:
   - Datos personales
   - Tipo de entrega
   - Información de tarjeta
6. Click en **"✓ Confirmar Pedido"**
7. ¡Recibirá confirmación con ID de orden!

## 💾 Almacenamiento de Datos

Los pedidos se guardan en **localStorage** del navegador:

- **Ubicación**: Datos locales del navegador
- **Formato**: JSON
- **Clave**: `orders`
- **Persistencia**: Los datos se mantienen entre sesiones

### Para acceder a los pedidos guardados:

```javascript
// En la consola del navegador (F12)
JSON.parse(localStorage.getItem("orders"));
```

## 🎨 Diseño Responsivo

- ✓ Compatible con desktop
- ✓ Compatible con tablets
- ✓ Compatible con móviles
- ✓ Interfaz intuitiva y moderna

## 📱 Elementos de UI

### Carrito (Panel flotante):

- Resumen de artículos
- Totalización automática
- Botones para ajustar cantidades
- Botón para realizar pedido

### Modal de Checkout:

- Numeroación visual de pasos
- Resumen del pedido actualizado
- Validación en tiempo real
- Dise

ño moderno con iconos

## ⚙️ Configuración de Productos

Los productos están definidos en [src/js/app.js](src/js/app.js):

```javascript
{
  name: "Carbón",           // Nombre del producto
  price: 100,              // Precio detalle
  wholesale: 43,           // Precio mayoreo
  wholesaleQty: 10,        // Cantidad mínima para mayoreo
  img: "../src/assets/images/carbon.png"
}
```

## 🔒 Seguridad

**Nota importante**: Este es un sistema de demostración.

- No usa encriptación real de tarjetas
- No se conecta a procesadores de pago reales
- Para producción, se debe integrar con:
  - Stripe, PayPal, o similar
  - Backend seguro
  - HTTPS/TLS
  - Cumplir PCI DSS

## 🐛 Pruebas Disponibles

Puedes usar datos de prueba:

- **Tarjeta**: 4111 1111 1111 1111
- **Vencimiento**: 12/25
- **CVV**: 123

## 📞 Soporte

Para modificaciones o ajustes:

- Editar catálogo: modificar `products` en `src/js/app.js`
- Cambiar estilos: editar `src/css/cart.css`
- Ajustar lógica: modificar `src/js/cart.js`

---

**Versión**: 1.0
**Última actualización**: 2026
