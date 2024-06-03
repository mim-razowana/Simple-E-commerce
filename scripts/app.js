'use strict';

const products = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbGFwdG9wc3xlbnwwfHwwfHx8MA%3D%3D',
    categories: ['Laptops', 'Gaming'],
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 50,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP-7ULdLJY6GroQqVD1kkM9Cr8_gStMf59pw&s',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefZQb-u7Y-K4G8uopEH3xpBkU_TPY5tOHrw&s',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 4,
    name: 'External Hard Drive',
    price: 120,
    image: 'https://cdn.thewirecutter.com/wp-content/media/2023/05/externalhardrives-2048px-09422.jpg',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 5,
    name: 'Graphics Card',
    price: 500,
    image: 'https://t3.ftcdn.net/jpg/03/01/93/52/360_F_301935235_VrnH2DZ4dL9ChJIeyg2VzJEmTrzbXAzt.jpg',
    categories: ['Components', 'Gaming'],
  },
  {
    id: 6,
    name: 'Portable SSD',
    price: 200,
    image: 'https://camerajabber.com/wp-content/uploads/2018/07/SanDisk_Extreme_Portable_SSD_review.jpg',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 7,
    name: 'Gaming Monitor',
    price: 300,
    image: 'https://www.pcworld.com/wp-content/uploads/2023/04/aopen-gaming-monitor-100869952-orig-1.jpg?quality=50&strip=all',
    categories: ['Monitors', 'Gaming'],
  },
  {
    id: 8,
    name: 'All-in-One Printer',
    price: 150,
    image: 'https://i.pcmag.com/imagery/reviews/05WMO6wEuH5W9Fk0qTL8qMl-1.fit_lim.size_840x473.v1635177549.png',
    categories: ['Peripherals', 'Printers'],
  },
];
let selectedCategory = null;

class Cart {
  constructor() {
    this.cart = [];
  }
  getProductIndexInCart(productId) {
    return this.cart.findIndex(function (product) {
      return product.id === productId;
    });
  }
  isProductExistInCart(productId) {
    return this.getProductIndexInCart(productId) !== -1;
  }
  addToCart(product) {
    if (this.isProductExistInCart(product.id)) {
      alert('This product is already in the cart.');
      return;
    }
    this.cart.push(product);
    this.renderCart();
  }
  removeProductFromCart(productId) {
    const productIndex = this.getProductIndexInCart(productId);
    if (productIndex === -1) {
      alert('Product is not in the cart!!!');
      return;
    }
    this.cart.splice(productIndex, 1);
    this.renderCart();
  }
  clearCart() {
    this.cart = [];
  }
  renderCart() {
    const cartItemList = document.getElementById('cart-items');
    cartItemList.innerHTML = '';
    const self = this;
    this.cart.forEach(function (product) {
      const cartItemElement = document.createElement('li');
      cartItemElement.innerText = `${product.name} - $${product.price} x ${1}`;

      const removeBtn = document.createElement('button');
      removeBtn.innerText = 'Remove';
      removeBtn.classList.add('text-red-500', 'ml-2');
      removeBtn.addEventListener('click', function () {
        self.removeProductFromCart(product.id);
      });
      cartItemElement.appendChild(removeBtn);

      cartItemList.appendChild(cartItemElement);
    });
  }
}

const cart = new Cart();

function getProductImageElement({ productImage, productName }) {
  const productImageElement = document.createElement('img');
  productImageElement.src = productImage;
  productImageElement.alt = productName;
  productImageElement.classList.add('w-full', 'mb-4');
  return productImageElement;
}

function getProductNameElement(productName) {
  const productNameElement = document.createElement('h3');
  productNameElement.innerText = productName;
  productNameElement.classList.add('text-lg', 'font-semibold');
  return productNameElement;
}

function getProductPriceElement(productPrice) {
  const productPriceElement = document.createElement('p');
  productPriceElement.textContent = `$${productPrice}`;
  productPriceElement.classList.add('text-gray-700');
  return productPriceElement;
}

function getAddToCartButton(product) {
  const addToCartBtn = document.createElement('button');
  addToCartBtn.innerText = 'Add to Cart';
  addToCartBtn.classList.add(
    'bg-blue-500',
    'hover:bg-blue-700',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'mt-2'
  );
  addToCartBtn.addEventListener('click', function () {
    cart.addToCart(product);
  });
  return addToCartBtn;
}

function getProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('bg-white', 'p-4', 'rounded', 'shadow');

  const productImage = getProductImageElement({
    productImage: product.image,
    productName: product.name,
  });
  card.appendChild(productImage);

  const productName = getProductNameElement(product.name);
  card.appendChild(productName);

  const productPrice = getProductPriceElement(product.price);
  card.appendChild(productPrice);

  const addToCartButton = getAddToCartButton(product);
  card.appendChild(addToCartButton);

  return card;
}

function renderProducts() {
  const productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '';

  let categorizedProducts = products;
  if (selectedCategory) {
    categorizedProducts = products.filter(function (product) {
      return product.categories.includes(selectedCategory);
    });
  }

  categorizedProducts.forEach(function (product) {
    const productCard = getProductCard(product);
    productListContainer.appendChild(productCard);
  });
}

function getProductCategories() {
  const productCategories = products.map(function (product) {
    return product.categories;
  });
  const categoryFlatList = productCategories.flat();
  const uniqueCategories = new Set(categoryFlatList);
  return [...uniqueCategories];
}

function renderCategories() {
  const categoryContainer = document.getElementById('category-filters');
  categoryContainer.innerHTML = '';

  const categories = getProductCategories();
  categories.forEach(function (category) {
    const categoryBtn = document.createElement('button');
    categoryBtn.innerText = category;
    categoryBtn.classList.add(
      'bg-gray-200',
      'hover:bg-gray-300',
      'text-gray-800',
      'font-semibold',
      'py-2',
      'px-4',
      'rounded',
      'mr-2'
    );
    categoryBtn.addEventListener('click', function () {
      selectedCategory = category;
      renderProducts();
    });
    categoryContainer.appendChild(categoryBtn);
  });
}

renderProducts();
renderCategories();

const clearFilterBtn = document.getElementById('clear-filters-btn');
clearFilterBtn.addEventListener('click', function () {
  selectedCategory = null;
  renderProducts();
});

const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', function () {
  cart.clearCart();
  cart.renderCart();
});
