window.cart = window.cart || {};
window.cart.items = [];

window.cart.init = function() {
  try {
    window.cart.items = JSON.parse(localStorage.getItem('carrinho') || '[]');
  } catch (e) {
    window.cart.items = [];
  }
};

window.cart.addItem = function(item) {
  if (!item) return;
  if (!window.cart.items) window.cart.items = [];
  const produtoId = item.produtoId || item.id || item.produto_id;
  const variacaoId = item.variacaoId || item.variacao_id || null;
  const idx = window.cart.items.findIndex(i =>
    String(i.produtoId || i.id || i.produto_id) === String(produtoId) &&
    String(i.variacaoId || i.variacao_id || '') === String(variacaoId || '')
  );
  if (idx >= 0) {
    window.cart.items[idx].quantidade = (window.cart.items[idx].quantidade || 1) + (item.quantidade || 1);
  } else {
    window.cart.items.push({
      produtoId,
      variacaoId,
      titulo: item.titulo || item.produtoTitulo || '',
      produtoTitulo: item.produtoTitulo || item.titulo || '',
      preco: item.preco || 0,
      quantidade: item.quantidade || 1,
      imagem: item.imagem || '',
      variacaoInfo: item.variacaoInfo || ''
    });
  }
  localStorage.setItem('carrinho', JSON.stringify(window.cart.items));
  window.cart.updateCartCount();
  if (typeof renderCart === 'function') renderCart();
};

window.cart.getTotal = function() {
  return window.cart.items.reduce((acc, item) => acc + (item.preco * (item.quantidade || 1)), 0);
};

window.cart.removeItem = function(index) {
  window.cart.items.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(window.cart.items));
  window.cart.updateCartCount();
  if (typeof renderCart === 'function') renderCart();
};

window.cart.updateQuantity = function(index, quantidade) {
  if (quantidade < 1) {
    window.cart.removeItem(index);
    return;
  }
  window.cart.items[index].quantidade = quantidade;
  localStorage.setItem('carrinho', JSON.stringify(window.cart.items));
  window.cart.updateCartCount();
  if (typeof renderCart === 'function') renderCart();
};

window.cart.clear = function() {
  window.cart.items = [];
  localStorage.setItem('carrinho', '[]');
  window.cart.updateCartCount();
  if (typeof renderCart === 'function') renderCart();
};

window.cart.updateCartCount = function() {
  let carrinho = [];
  try {
    carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  } catch (e) {
    carrinho = [];
  }
  const count = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
  document.querySelectorAll('#quantidade_x, #cart-count-header, #catPanelCartBadge').forEach(el => {
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.cart && typeof window.cart.updateCartCount === 'function') {
    window.cart.updateCartCount();
  }
});
