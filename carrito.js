document.addEventListener('DOMContentLoaded', cargarProductos);

function cargarProductos() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos'));
  const productosContainer = document.getElementById('productos');

  if (productosGuardados && productosGuardados.length > 0) {
    productosGuardados.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
      productoElement.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Editorial: ${producto.editorial}</p>
        <p>Stock: ${producto.stock}</p>
        <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
      `;
      productosContainer.appendChild(productoElement);
    });
  } else {
    productosContainer.innerHTML = '<p>No hay productos disponibles.</p>';
  }
}

