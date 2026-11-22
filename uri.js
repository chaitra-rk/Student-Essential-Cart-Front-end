const products = [
    { id: 1, name: "Mobile Charger", price: 299, image: "https://th.bing.com/th/id/OIP.J8Haq1QzZpUY8X4bJOJZDwHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { id: 2, name: "Earphones", price: 499, image: "https://th.bing.com/th/id/OIP.2SXwxQE6dgxLMibRA6t_rwHaF7?w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { id: 3, name: "Pencil Box", price: 199, image: "https://th.bing.com/th/id/OIP.RdYYBGpJxTFwE3dkWwjOJAHaHR?w=252&h=247&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { id: 4, name: "Laptop Stand", price: 899, image: "https://th.bing.com/th/id/OIP.rmzl8D-qP2xxCGlm8UYfgAHaHX?w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" }
];

let cart = [];

const renderProducts = () => {
    $("#products").html("");
    products.forEach(product => {
        $("#products").append(`
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `);
    });
};

const addToCart = id => {
    const product = products.find(p => p.id === id);
    const item = cart.find(p => p.id === id);
    item ? item.qty++ : cart.push({ ...product, qty: 1 });
    renderCart();
};

const renderCart = () => {
    $("#cart").html(cart.length ? cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price} x ${item.qty}</p>
            <button onclick="updateQty(${item.id}, 1)">+</button>
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join("") : "<p>Your cart is empty.</p>");
};

const updateQty = (id, change) => {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
    renderCart();
};

const removeFromCart = id => {
    cart = cart.filter(p => p.id !== id);
    renderCart();
};

$(document).ready(() => {
    renderProducts();
    renderCart();
});
