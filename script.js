document.addEventListener('DOMContentLoaded', () => {

    // --- Логіка для хедера та кнопок (залишено з вашого коду) ---
    const topBanner = document.getElementById('topBanner');
    const closeBannerBtn = document.getElementById('closeBannerBtn');

    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
        });
    }

    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            // alert('Ця кнопка поки що в розробці!');
        });
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const img = card.querySelector('img');
        if (img && img.dataset.hoverSrc) {
            card.addEventListener('mouseenter', () => {
                img.src = img.dataset.hoverSrc;
            });
            card.addEventListener('mouseleave', () => {
                img.src = img.dataset.defaultSrc;
            });
        }
    });

    // --- НОВА ЛОГІКА ДЛЯ КОШИКА ---

    const productGrid = document.getElementById('product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartSectionWrapper = document.getElementById('cart-section-wrapper');
    const studentDiscountRadios = document.querySelectorAll('input[name="student"]');

    let cart = []; // Масив для зберігання товарів у кошику
    const STUDENT_DISCOUNT = 0.10; // 10%

    // Обробник кліків на сітці товарів
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const card = e.target.closest('.product-card');
            const id = card.dataset.id;
            const name = card.querySelector('.product-name').textContent;
            const price = parseFloat(card.querySelector('.product-price').textContent.replace('$', ''));
            const imageSrc = card.querySelector('img').src;
            
            addToCart(id, name, price, imageSrc);
        }
    });

    // Обробник кліків у кошику (для кнопок +/-)
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const parentRow = target.closest('tr');
        if (!parentRow) return;
        
        const id = parentRow.dataset.id;

        if (target.classList.contains('quantity-increase')) {
            updateQuantity(id, 1);
        }
        if (target.classList.contains('quantity-decrease')) {
            updateQuantity(id, -1);
        }
    });
    
    // Обробник зміни опції "Ви студент?"
    studentDiscountRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateTotal();
        });
    });

    function addToCart(id, name, price, imageSrc) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, imageSrc, quantity: 1 });
        }
        
        if (cart.length > 0) {
            cartSectionWrapper.classList.remove('hidden');
        }

        renderCart();
    }
    
    function updateQuantity(id, change) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                // Видалити товар, якщо кількість 0 або менше
                cart.splice(itemIndex, 1);
            }
        }
        
        if (cart.length === 0) {
            cartSectionWrapper.classList.add('hidden');
        }
        
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Очистити кошик перед оновленням

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            const itemRow = document.createElement('tr');
            itemRow.dataset.id = item.id;
            itemRow.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.imageSrc}" alt="${item.name}">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-controls">
                        <button class="quantity-decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-increase">+</button>
                    </div>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(itemRow);
        });
        
        updateTotal();
    }
    
    function updateTotal() {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const isStudent = document.querySelector('input[name="student"]:checked').value === 'yes';
        
        if (isStudent) {
            total *= (1 - STUDENT_DISCOUNT);
        }
        
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
});


