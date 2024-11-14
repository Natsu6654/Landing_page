document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('crud-form').addEventListener('submit', agregarProducto);
  cargarProductos();
});

let productos = [];

function agregarProducto(event) {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const editorial = document.getElementById('editorial').value;
  const stock = document.getElementById('stock').value;
  const imagen = document.getElementById('imagen').value;
  
  const producto = { nombre, precio, editorial, stock, imagen };
  productos.push(producto);
  guardarProductos();
  mostrarProductos();
  
  document.getElementById('crud-form').reset();
}

function cargarProductos() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos'));
  if (productosGuardados) {
    productos = productosGuardados;
    mostrarProductos();
  }
}

function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function mostrarProductos() {
  const productosTableBody = document.querySelector('#productos-table tbody');
  productosTableBody.innerHTML = '';

  productos.forEach((producto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.editorial}</td>
      <td>${producto.stock}</td>
      <td><img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-tabla"></td>
      <td>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    productosTableBody.appendChild(fila);
  });
}

function editarProducto(index) {
  const producto = productos[index];
  document.getElementById('nombre').value = producto.nombre;
  document.getElementById('precio').value = producto.precio;
  document.getElementById('editorial').value = producto.editorial;
  document.getElementById('stock').value = producto.stock;
  document.getElementById('imagen').value = producto.imagen;

  productos.splice(index, 1);
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarProductos();
  mostrarProductos();
}
