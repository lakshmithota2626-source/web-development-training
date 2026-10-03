/**
 * DAY 5: L'AURA ARTISAN BISTRO & RESTAURANT MENU CONTROLLER
 */

// =============================================================================
// 1. MENU ITEMS DATASET
// =============================================================================

const MENU_DATA = [
    // --- STARTERS & TAPAS ---
    {
        id: "s1",
        title: "Truffle Burrata & Heirloom Peach",
        category: "starters",
        price: 18.50,
        icon: "🧀",
        desc: "Pugliese artisanal burrata, caramelized white peach, 12-year aged Modena balsamic, micro basil.",
        tags: ["Vegetarian", "Chef's Special"],
        isVeg: true,
        isSpicy: false,
        isSpecial: true,
        rating: 4.9
    },
    {
        id: "s2",
        title: "Charred Spanish Octopus",
        category: "starters",
        price: 22.00,
        icon: "🐙",
        desc: "Smoked paprika emulsion, fingerling potato confit, caper berries, lemon herb oil.",
        tags: ["Seafood", "Gluten-Free"],
        isVeg: false,
        isSpicy: true,
        isSpecial: false,
        rating: 4.8
    },
    {
        id: "s3",
        title: "Wild Foraged Mushroom Crostini",
        category: "starters",
        price: 16.00,
        icon: "🍄",
        desc: "Chanterelles & morels sautéed in thyme butter, black truffle cream, toasted sourdough.",
        tags: ["Vegetarian"],
        isVeg: true,
        isSpicy: false,
        isSpecial: false,
        rating: 4.7
    },

    // --- CHEF'S MAINS ---
    {
        id: "m1",
        title: "A5 Miyazaki Wagyu Tenderloin",
        category: "mains",
        price: 68.00,
        icon: "🥩",
        desc: "Pan-seared Japanese Wagyu, celery root mousseline, roasted bone marrow jus, glazed baby leeks.",
        tags: ["Chef's Special", "Gluten-Free"],
        isVeg: false,
        isSpicy: false,
        isSpecial: true,
        rating: 5.0
    },
    {
        id: "m2",
        title: "Pan-Roasted Ora King Salmon",
        category: "mains",
        price: 36.50,
        icon: "🐟",
        desc: "Crispy skin New Zealand salmon, saffron beurre blanc, Romanesco florets, salmon roe.",
        tags: ["Seafood", "Gluten-Free"],
        isVeg: false,
        isSpicy: false,
        isSpecial: false,
        rating: 4.9
    },
    {
        id: "m3",
        title: "Smoked Chili Duck Breast",
        category: "mains",
        price: 38.00,
        icon: "🍗",
        desc: "Maple-glazed Magret duck breast, spiced cherry reduction, parsnip puree, rainbow chard.",
        tags: ["Spicy", "Chef's Special"],
        isVeg: false,
        isSpicy: true,
        isSpecial: true,
        rating: 4.8
    },

    // --- WOODFIRED & PASTA ---
    {
        id: "p1",
        title: "Handmade Black Truffle Tagliolini",
        category: "pasta",
        price: 32.00,
        icon: "🍝",
        desc: "Fresh egg pasta ribbons, 36-month Parmigiano-Reggiano, French butter, shaved Norcia winter truffle.",
        tags: ["Vegetarian", "Chef's Special"],
        isVeg: true,
        isSpicy: false,
        isSpecial: true,
        rating: 5.0
    },
    {
        id: "p2",
        title: "Woodfired Diavola Pizza",
        category: "pasta",
        price: 24.00,
        icon: "🍕",
        desc: "San Marzano D.O.P. tomatoes, spicy Calabrian Nduja, fior di latte, hot honey drizzle.",
        tags: ["Spicy"],
        isVeg: false,
        isSpicy: true,
        isSpecial: false,
        rating: 4.9
    },
    {
        id: "p3",
        title: "Lobster & Saffron Ravioli",
        category: "pasta",
        price: 34.00,
        icon: "🦞",
        desc: "Maine lobster stuffed pasta pockets, tarragon bisque reduction, charred cherry tomatoes.",
        tags: ["Seafood"],
        isVeg: false,
        isSpicy: false,
        isSpecial: false,
        rating: 4.9
    },

    // --- ARTISAN DESSERTS ---
    {
        id: "d1",
        title: "Valrhona Dark Chocolate Sphere",
        category: "desserts",
        price: 15.00,
        icon: "🍫",
        desc: "70% single-origin chocolate dome, warm salted caramel pour, hazelnut praline crunch.",
        tags: ["Vegetarian", "Chef's Special"],
        isVeg: true,
        isSpicy: false,
        isSpecial: true,
        rating: 4.9
    },
    {
        id: "d2",
        title: "Madagascar Vanilla Bean Panna Cotta",
        category: "desserts",
        price: 13.50,
        icon: "🍮",
        desc: "Silky organic cream, macerated wild blackberries, candied pistachio crumble.",
        tags: ["Vegetarian", "Gluten-Free"],
        isVeg: true,
        isSpicy: false,
        isSpecial: false,
        rating: 4.8
    },

    // --- COCKTAILS & ELIXIRS ---
    {
        id: "k1",
        title: "Smoked Rosemary Old Fashioned",
        category: "drinks",
        price: 18.00,
        icon: "🥃",
        desc: "Kentucky Bourbon, organic Demerara syrup, Angostura bitters, flamed rosemary smoke.",
        tags: ["Chef's Special"],
        isVeg: true,
        isSpicy: false,
        isSpecial: true,
        rating: 5.0
    },
    {
        id: "k2",
        title: "Spicy Yuzu Hibiscus Margarita",
        category: "drinks",
        price: 16.50,
        icon: "🍸",
        desc: "Blanco Tequila, fresh Japanese yuzu, infused hibiscus liquor, chili salt rim.",
        tags: ["Spicy"],
        isVeg: true,
        isSpicy: true,
        isSpecial: false,
        rating: 4.8
    }
];

// =============================================================================
// 2. STATE MANAGEMENT & DOM SELECTION
// =============================================================================

let activeCategory = "all";
let currentOrder = []; // [{ id, title, price, qty }]

const menuGrid = document.getElementById('menuGrid');
const emptyState = document.getElementById('emptyState');
const menuSearchInput = document.getElementById('menuSearchInput');
const filterVeg = document.getElementById('filterVeg');
const filterSpicy = document.getElementById('filterSpicy');
const filterSpecial = document.getElementById('filterSpecial');

const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const btnToggleCart = document.getElementById('btnToggleCart');
const btnCloseCart = document.getElementById('btnCloseCart');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartItemsList = document.getElementById('cartItemsList');

const billSubtotal = document.getElementById('billSubtotal');
const billTax = document.getElementById('billTax');
const billGrandTotal = document.getElementById('billGrandTotal');

// =============================================================================
// 3. MENU RENDERING & FILTERING
// =============================================================================

function renderMenu() {
    const searchQuery = menuSearchInput.value.toLowerCase().trim();
    const onlyVeg = filterVeg.checked;
    const onlySpicy = filterSpicy.checked;
    const onlySpecial = filterSpecial.checked;

    const filtered = MENU_DATA.filter(item => {
        // Category Check
        if (activeCategory !== "all" && item.category !== activeCategory) {
            return false;
        }

        // Dietary Checks
        if (onlyVeg && !item.isVeg) return false;
        if (onlySpicy && !item.isSpicy) return false;
        if (onlySpecial && !item.isSpecial) return false;

        // Search Query Check
        if (searchQuery) {
            const matchTitle = item.title.toLowerCase().includes(searchQuery);
            const matchDesc = item.desc.toLowerCase().includes(searchQuery);
            if (!matchTitle && !matchDesc) return false;
        }

        return true;
    });

    menuGrid.innerHTML = "";

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        menuGrid.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    menuGrid.classList.remove('hidden');

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = "food-card";

        const tagsHtml = item.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');
        const chefBadge = item.isSpecial ? `<span class="badge-tag chef">⭐ Chef's Pick</span>` : '';

        card.innerHTML = `
            <div class="food-image-wrapper">
                <span>${item.icon}</span>
                ${chefBadge}
                <div class="price-tag">$${item.price.toFixed(2)}</div>
            </div>
            <div class="food-details">
                <div class="food-title-row">
                    <h3>${item.title}</h3>
                    <span class="food-rating">★ ${item.rating}</span>
                </div>
                <p class="food-desc">${item.desc}</p>
                <div class="food-tags">${tagsHtml}</div>
                <button class="btn-add-order" onclick="addToCart('${item.id}')">
                    + Add to Order ($${item.price.toFixed(2)})
                </button>
            </div>
        `;

        menuGrid.appendChild(card);
    });
}

// Category Tabs Listener
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        renderMenu();
    });
});

// Search and Filter Listeners
menuSearchInput.addEventListener('input', renderMenu);
filterVeg.addEventListener('change', renderMenu);
filterSpicy.addEventListener('change', renderMenu);
filterSpecial.addEventListener('change', renderMenu);

document.getElementById('btnResetFilters').addEventListener('click', () => {
    menuSearchInput.value = "";
    filterVeg.checked = false;
    filterSpicy.checked = false;
    filterSpecial.checked = false;
    activeCategory = "all";
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-category="all"]').classList.add('active');
    renderMenu();
});

// =============================================================================
// 4. CART & ORDERING SYSTEM
// =============================================================================

function addToCart(itemId) {
    const product = MENU_DATA.find(item => item.id === itemId);
    if (!product) return;

    const existing = currentOrder.find(item => item.id === itemId);
    if (existing) {
        existing.qty += 1;
    } else {
        currentOrder.push({
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1
        });
    }

    updateCartUI();
    openCartDrawer();
}

function updateCartItemQty(itemId, delta) {
    const item = currentOrder.find(i => i.id === itemId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        currentOrder = currentOrder.filter(i => i.id !== itemId);
    }

    updateCartUI();
}

function updateCartUI() {
    const totalItemsCount = currentOrder.reduce((acc, curr) => acc + curr.qty, 0);
    cartCountBadge.textContent = totalItemsCount;
    cartDrawerCount.textContent = `${totalItemsCount} items`;

    cartItemsList.innerHTML = "";

    if (currentOrder.length === 0) {
        cartItemsList.innerHTML = `
            <div class="cart-empty-state">
                <span class="cart-empty-icon">🛍️</span>
                <p>Your order bag is currently empty.</p>
            </div>
        `;
        billSubtotal.textContent = "$0.00";
        billTax.textContent = "$0.00";
        billGrandTotal.textContent = "$0.00";
        return;
    }

    let subtotal = 0;

    currentOrder.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = "cart-item-row";
        row.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
            </div>
            <div class="cart-qty-ctrl">
                <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)">-</button>
                <span class="cart-qty-text">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)">+</button>
            </div>
        `;
        cartItemsList.appendChild(row);
    });

    const tax = subtotal * 0.08;
    const grandTotal = subtotal + tax;

    billSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    billTax.textContent = `$${tax.toFixed(2)}`;
    billGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
}

function openCartDrawer() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
}

function closeCartDrawer() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
}

function renderReceipt(entries) {
    const modalReceipt = document.getElementById('modalReceipt');
    modalReceipt.replaceChildren();

    entries.forEach(([label, value], index) => {
        if (index > 0) {
            modalReceipt.appendChild(document.createElement('br'));
        }

        const labelNode = document.createElement('strong');
        labelNode.textContent = `${label}: `;
        modalReceipt.append(labelNode, document.createTextNode(value));
    });
}

btnToggleCart.addEventListener('click', openCartDrawer);
btnCloseCart.addEventListener('click', closeCartDrawer);
cartBackdrop.addEventListener('click', closeCartDrawer);

// Checkout Handler
document.getElementById('btnCheckout').addEventListener('click', () => {
    if (currentOrder.length === 0) {
        alert("Please add at least one dish before checking out!");
        return;
    }

    const orderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = billGrandTotal.textContent;

    closeCartDrawer();

    renderReceipt([
        ['Order Ref', orderNum],
        ['Items Ordered', `${currentOrder.length} dish variety`],
        ['Total Amount', total],
        ['Kitchen Status', 'Sent to Executive Chef']
    ]);

    document.getElementById('modalTitle').textContent = "Order Placed Successfully!";
    document.getElementById('modalDesc').textContent = "Your culinary selections are being prepared fresh in our kitchen.";
    document.getElementById('confirmationModal').classList.add('open');

    // Reset order
    currentOrder = [];
    updateCartUI();
});

// =============================================================================
// 5. TABLE RESERVATION MODAL
// =============================================================================

const reserveForm = document.getElementById('reserveForm');
const confirmationModal = document.getElementById('confirmationModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnModalDone = document.getElementById('btnModalDone');
const btnOpenReserve = document.getElementById('btnOpenReserve');

btnOpenReserve.addEventListener('click', () => {
    document.getElementById('reserve-section').scrollIntoView({ behavior: 'smooth' });
});

reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('resName').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;

    renderReceipt([
        ['Guest Name', name],
        ['Reservation Date', date],
        ['Seating Time', time],
        ['Party Size', `${guests} Guests`],
        ['Table Type', 'Reserved Window Booth']
    ]);

    document.getElementById('modalTitle').textContent = "Table Reserved!";
    document.getElementById('modalDesc').textContent = "A confirmation email & SMS has been dispatched to your contact.";
    confirmationModal.classList.add('open');

    reserveForm.reset();
});

btnCloseModal.addEventListener('click', () => confirmationModal.classList.remove('open'));
btnModalDone.addEventListener('click', () => confirmationModal.classList.remove('open'));
confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) confirmationModal.classList.remove('open');
});

// Set default reservation date to tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('resDate').value = tomorrow.toISOString().split('T')[0];

// Initial Render
renderMenu();
updateCartUI();
