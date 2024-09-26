document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.modal .close');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    let cart = []; 

    // Load cart from local storage
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCart();
        }
    }

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Open cart modal
    cartButton.addEventListener('click', function() {
        cartModal.style.display = 'block';
    });

    // Clear cart
    clearCartButton.addEventListener('click', function() {
        cart = [];
        saveCart(); // Save the empty cart
        updateCart();
    });

    // Close cart modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const name = product.querySelector('h2').textContent;
            const price = parseFloat(product.getAttribute('data-price'));
            cart.push({ name, price });
            saveCart(); // Save the updated cart
            updateCart();
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            cartItemsList.innerHTML += `<li>${item.name} - R${item.price.toFixed(2)}</li>`;
        });
        cartButton.textContent = `Cart (${cart.length}) - R${total.toFixed(2)}`;
    }

    // Checkout via WhatsApp
    checkoutButton.addEventListener('click', function() {
        let message = 'I would like to purchase the following items:\n';
        cart.forEach(item => {
            message += `${item.name} - R${item.price.toFixed(2)}\n`;
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        message += `\nTotal: R${total.toFixed(2)}`;
        window.open(`https://wa.me/27698986450?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Initialize the cart when the page loads
    loadCart();
});

// The rest of your code remains unchanged

// Example for the rest of your script, like modals and form handling, etc.

function filterProducts() {
    // Get the search input value
    const searchValue = document.getElementById('search-input').value.toLowerCase();

    // Get all products
    const products = document.querySelectorAll('#products .product');

    // Loop through each product
    products.forEach(product => {
        // Get the product name and description
        const productName = product.querySelector('h2').textContent.toLowerCase();
        const productDescription = product.querySelector('h5').textContent.toLowerCase();

        // Check if the search value matches the product name or description
        if (productName.includes(searchValue) || productDescription.includes(searchValue)) {
            product.style.display = ''; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', icon.dataset.link);
    });

    icon.addEventListener('click', (e) => {
        window.location.href = icon.dataset.link;
    });
});


// Get the modal
var modal = document.getElementById("signupModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to show the modal
function showModal() {
    modal.style.display = "block";
}


function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
    } else {
        cartDropdown.style.display = 'block';
    }
}

document.getElementById('menu-toggle').addEventListener('click', function() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
});
// script.js

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 3000; // Change slide every 3 seconds

function showSlide(index) {
    const slider = document.querySelector('.slider');
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

// Initialize the first slide
showSlide(currentIndex);

// Auto-slide every `slideInterval` milliseconds
setInterval(nextSlide, slideInterval);
// script.js

// Function to store the current page URL in sessionStorage
function storeCurrentPage() {
    sessionStorage.setItem('lastVisitedPage', window.location.href);
}

// Function to navigate to the last visited page if available
function navigateToLastVisitedPage() {
    const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');
    if (lastVisitedPage && lastVisitedPage !== window.location.href) {
        window.location.href = lastVisitedPage;
    }
}

// Add event listeners for storing the current page and navigating on load
window.addEventListener('load', function() {
    storeCurrentPage();
    navigateToLastVisitedPage();
});
