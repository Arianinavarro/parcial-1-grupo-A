
document.addEventListener('DOMContentLoaded', () => {
    
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; 
    }


    loadComponent('main-header', 'components/header.html');
    loadComponent('main-sidebar', 'components/sidebar.html');
    loadComponent('main-footer', 'components/footer.html');

    
    loadProducts();
});

/**
 * @param {string} elementId 
 * @param {string} url 
 */
async function loadComponent(elementId, url) {
    try {
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        }
       
        const text = await response.text();
        
        
        document.getElementById(elementId).innerHTML = text;
    } catch (error) {
        console.error('No se pudo cargar el componente:', error);
    }
}


class ProductCard extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({
            mode: 'open'
        });
    }

    
    connectedCallback() {
        this.render();
    }

    
    render() {
        
        const nombre = this.getAttribute('name');
        const imagen = this.getAttribute('image');
        const descripcion = this.getAttribute('description');
        const precio = this.getAttribute('price');

        
        this.shadowRoot.innerHTML = `
        <style>
          .product-card {
            border: 5px solid var(--border-color, #e0e0e0);
            padding: 1rem;
            text-align: center;
            background-color: var(--card-background, #fff);
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .product-card:hover {
            transform: translateY(-20px);
            box-shadow: 0 4px 10px rgba(147, 32, 209, 0.1);
          }
          .product-card img {
            max-width: 100%;
            height: auto;
            margin-bottom: 1rem;
          }
          h3 {
            margin: 0.5rem 0;
            color: var(--secondary-color, #880e4f);
          }
          .product-price {
            font-weight: bold;
            color: #000;
             font-size: 20px;
          }
        </style>
        <div class="product-card">
          <div>
            <img src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
          </div>
          <p class="product-price">Precio: $${precio}</p>
        </div>
      `;
    }
}


if (!customElements.get('product-card')) {
    customElements.define('product-card', ProductCard);
}



async function loadProducts() {
    try {
        const response = await fetch('data/productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de productos.');
        }
        const products = await response.json();

        
        const templateContainer = document.getElementById('template-products-container');
        const wcContainer = document.getElementById('wc-products-container');
        const template = document.getElementById('product-template');
        
       
        templateContainer.innerHTML = '';
        wcContainer.innerHTML = '';
        
        
        const productsForTemplate = products.slice(0, 3);
        const productsForWC = products.slice(3);

        
        productsForTemplate.forEach(product => {
           
            const productClone = template.content.cloneNode(true);
            
            
            productClone.querySelector('.product-image').src = product.imagen;
            productClone.querySelector('.product-image').alt = product.nombre;
            productClone.querySelector('.product-name').textContent = product.nombre;
            productClone.querySelector('.product-description').textContent = product.descripcion;
            productClone.querySelector('.product-price').textContent = `Precio: $${product.precio}`;
            
            
            templateContainer.appendChild(productClone);
        });
        
        
        productsForWC.forEach(product => {
            const productElement = document.createElement('product-card');
            
            productElement.setAttribute('name', product.nombre);
            productElement.setAttribute('image', product.imagen);
            productElement.setAttribute('description', product.descripcion);
            productElement.setAttribute('price', product.precio);
            
            
            wcContainer.appendChild(productElement);
        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}
