<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Carrinho de Compras</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <style>
        /* Cart item card — estilo marketplace */
        .cart-store-section { background:#fff; border-radius:16px; margin-bottom:12px; overflow:hidden; box-shadow:0 1px 6px rgba(0,0,0,0.07); }
        .cart-store-header { display:flex; align-items:center; gap:8px; padding:12px 14px 10px; border-bottom:1px solid #f3f4f6; }
        .cart-store-name { font-size:14px; font-weight:700; color:#111; flex:1; }
        .cart-store-chevron { color:#bbb; font-size:13px; }
        .cart-shipping-box { display:flex; align-items:center; gap:10px; background:#e8faf8; border-radius:14px; margin:10px 14px; padding:11px 14px; border:1.5px solid #b2e4df; }
        .cart-shipping-box-text { font-size:12px; font-weight:500; color:#007c6e; flex:1; line-height:1.4; }
        .cart-shipping-box-action { font-size:12px; font-weight:700; color:#009a85; white-space:nowrap; }
        .cart-item-row { display:flex; gap:10px; padding:10px 14px; align-items:flex-start; border-top:1px solid #f7f7f7; }
        .cart-item-img { width:80px; height:80px; min-width:80px; border-radius:8px; object-fit:contain; background:#f5f5f5; }
        .cart-item-body { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
        .cart-item-title { font-size:13px; color:#222; font-weight:500; line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .cart-item-price-row { display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin-top:2px; }
        .cart-item-price { font-size:18px; font-weight:800; color:#fe2d55; line-height:1; }
        .cart-item-price-frac { font-size:13px; font-weight:600; }
        .cart-item-ticket { width:14px; height:14px; object-fit:contain; vertical-align:middle; margin-left:1px; }
        .cart-item-oldprice { font-size:11px; color:#aaa; text-decoration:line-through; }
        .cart-item-badge { font-size:10px; font-weight:700; color:#fff; background:#fe2d55; border-radius:3px; padding:1px 5px; }
        .cart-item-sub { font-size:11px; color:#999; margin-top:1px; }
        .cart-qty { display:flex; align-items:center; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; margin-top:6px; align-self:flex-end; }
        .cart-qty button { width:30px; height:30px; border:none; background:#fff; font-size:18px; color:#333; cursor:pointer; display:flex; align-items:center; justify-content:center; font-weight:300; }
        .cart-qty span { width:30px; text-align:center; font-size:13px; font-weight:700; color:#111; border-left:1px solid #e5e7eb; border-right:1px solid #e5e7eb; height:30px; display:flex; align-items:center; justify-content:center; }
        .cart-item-remove { color:#ccc; font-size:13px; cursor:pointer; padding:2px 0 0 4px; }
        /* Banner topo */
        .cart-top-banner { display:flex; align-items:center; gap:10px; background:#e0f7f4; border-radius:0; padding:11px 16px; margin:0 -12px 14px -12px; border:1.5px solid #7cccc5; border-left:none; border-right:none; }
        .cart-top-banner-text { font-size:13px; font-weight:600; color:#007c6e; }
        /* Bloco Proteção do cliente (mesmo estilo do produto) */
        .protecao-cliente {
            background: #fdf8f0;
            border: 1px solid #e8dcc8;
            border-radius: 14px;
            padding: 13px 16px;
            margin: 10px 0 0 0;
            cursor: pointer;
        }
        .protecao-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .protecao-header .header-left {
            display: flex;
            align-items: center;
            gap: 7px;
            font-weight: 700;
            color: #7a5c1e;
            font-size: 14px;
        }
        .protecao-header .header-right { display: flex; align-items: center; }
        .protecao-lista {
            list-style: none;
            padding: 0; margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 7px 8px;
        }
        .protecao-lista li {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            color: #555;
        }
        .protecao-lista li .pcheck {
            color: #7a5c1e;
            font-size: 13px;
            font-weight: 700;
            flex-shrink: 0;
        }

        .toast-center {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(.98);
            min-width: 240px;
            max-width: 90vw;
            background: #3a3a3a;
            color: #fff;
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, .28);
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            pointer-events: none;
        }

        .toast-center.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .toast-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
        }

        .toast-icon.success {
            background: #2ecc71;
        }

        .toast-icon.error {
            background: #e74c3c;
        }

        .toast-icon.info {
            background: #db3450;
        }

        .toast-text {
            font-weight: 600;
        }

        .toast-icon svg {
            width: 14px;
            height: 14px;
            stroke: #fff;
        }

    </style>
</head>

<body class="bg-gray-50">
    <header class="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div class="max-w-3xl mx-auto px-4">
            <div class="flex justify-between items-center h-14">
                <a href="javascript:history.back()" class="text-gray-700 hover:text-gray-900 text-lg"><i class="fas fa-arrow-left"></i></a>
                <h1 class="text-base font-semibold text-gray-900">Carrinho (<span id="cart-count-header">0</span>)</h1>
                <div style="width:24px;"></div>
            </div>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-3 pt-16 pb-32">
        <div id="cart-items" class="space-y-3" style="display:none"></div>

        <div id="empty-cart" class="hidden flex flex-col items-center text-center py-12 gap-3">
            <img src="/uploads/icone_carrinhovazio.png" alt="Carrinho vazio" style="width:110px;height:auto;opacity:0.13;filter:grayscale(1);">
            <p style="font-size:17px;font-weight:700;color:#111;margin-top:4px;">Seu carrinho está vazio</p>
            <p style="font-size:13px;color:#888;margin-top:-4px;">Explore nossos produtos e adicione ao carrinho</p>
            <a href="index.html" style="margin-top:8px;padding:12px 32px;background:#e84565;color:#fff;border-radius:50px;font-size:14px;font-weight:700;text-decoration:none;display:inline-block;letter-spacing:.01em;">Começar a comprar</a>
        </div>

        <section id="secao-protecao" class="mt-6" style="display:none">
            <div class="protecao-cliente" onclick="abrirModalProtecao()">
                <div class="protecao-header">
                    <div class="header-left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#7a5c1e"><path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5l-8-3z"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <span>Proteção do cliente</span>
                    </div>
                    <div class="header-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="#7a5c1e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
                    </div>
                </div>
                <ul class="protecao-lista">
                    <li><span class="pcheck">✓</span>Devolução gratuita</li>
                    <li><span class="pcheck">✓</span>Reembolso se algo der errado</li>
                    <li><span class="pcheck">✓</span>Pagamento seguro</li>
                    <li><span class="pcheck">✓</span>Se o pedido não for enviado no prazo</li>
                </ul>
            </div>
        </section>

                <section id="recomendacoes" class="mt-6">
            <p style="font-size:15px;font-weight:700;color:#111;margin-bottom:12px;padding:0 2px;">Você também pode gostar</p>
            <div id="rec-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;"></div>
        </section>
            </main>

    <footer id="rodape-carrinho" class="fixed bottom-0 left-0 right-0 bg-white" style="display:none;box-shadow:0 -2px 16px rgba(0,0,0,0.09);padding:10px 14px calc(10px + env(safe-area-inset-bottom));">
        <div class="max-w-3xl mx-auto" style="display:flex;align-items:center;gap:10px;">
            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;cursor:pointer;" onclick="_toggleAll()">
                <span id="cart-cb-all" style="width:22px;height:22px;border-radius:50%;background:#fe2d55;border:2px solid #fe2d55;display:inline-flex;align-items:center;justify-content:center;transition:background .15s,border .15s;">
                    <svg width="11" height="11" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span style="font-size:12px;font-weight:600;color:#333;">Tudo</span>
            </div>
            <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:baseline;gap:2px;">
                    <span style="font-size:12px;color:#fe2d55;font-weight:600;">R$</span>
                    <span id="cart-total" style="font-size:20px;font-weight:800;color:#fe2d55;line-height:1;">0,00</span>
                </div>
                <div style="font-size:11px;color:#009a85;font-weight:600;">Frete grátis</div>
            </div>
            <button onclick="finalizarCompra()" style="background:#fe2d55;color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;white-space:nowrap;cursor:pointer;flex-shrink:0;">
                Finalizar compra (<span id="cart-count-footer">0</span>)
            </button>
        </div>
    </footer>

    <script src="js/cart.js"></script>
    <script>
    // Carrega produtos do sistema para mapear detalhes no carrinho
    let produtosSistema = [];
    fetch('produtos.json')
        .then(resp => resp.json())
        .then(data => { produtosSistema = data; if (typeof renderCart === 'function') renderCart(); if (typeof renderRecomendacoes === 'function') renderRecomendacoes(); })
        .catch(() => { produtosSistema = []; });

    function parseValor(val) {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
            const n = Number(val.replace(',', '.'));
            return isNaN(n) ? 0 : n;
        }
        return 0;
    }

    // Busca detalhes do produto pelo id/variação e inclui desconto/preço de comparação
    function getProdutoDetalhado(item) {
        if (!produtosSistema.length) return { ...item, variacaoInfo: item.variacaoInfo || '' };
        const prod = produtosSistema.find(p => String(p.id) === String(item.produtoId));
        if (!prod) return { ...item, variacaoInfo: item.variacaoInfo || '' };
        let variacao = null;
        if (item.variacaoId && prod.variacoes && prod.variacoes.length) {
            variacao = prod.variacoes.find(v => String(v.id) === String(item.variacaoId));
        }
        const tituloPreferido = (item.titulo && item.titulo.trim())
            ? item.titulo
            : (variacao ? (variacao.titulo || '') : (prod.titulo || ''));
        const precoPreferido = (typeof item.preco === 'number' && !isNaN(item.preco))
            ? item.preco
            : (variacao ? parseValor(variacao.preco) : parseValor(prod.preco));
        const precoComparacao = item.precoComparacao || item.preco_comparacao || (variacao ? parseValor(variacao.preco_comparacao) : parseValor(prod.preco_comparacao));
        const imagemPreferida = item.imagem || (variacao && variacao.imagem) || (prod.fotos && prod.fotos[0]) || '';
        const descontoInformado = item.desconto || item.desconto_percentual || (variacao ? variacao.desconto : prod.desconto);
        const descontoNumero = descontoInformado ? Number(String(descontoInformado).replace('%','').replace(',','.')) : null;
        const descontoCalc = (precoComparacao && precoComparacao > precoPreferido)
            ? Math.round((1 - (precoPreferido / precoComparacao)) * 100)
            : null;
        const descontoFinal = (descontoNumero && !isNaN(descontoNumero)) ? Math.round(descontoNumero) : descontoCalc;
        return {
            ...item,
            produtoTitulo: prod.titulo || item.produtoTitulo || '',
            titulo: tituloPreferido,
            preco: precoPreferido,
            precoComparacao: precoComparacao || null,
            desconto: descontoFinal,
            imagem: imagemPreferida,
            variacaoInfo: variacao ? (variacao.info || variacao.titulo || '') : (item.variacaoInfo || ''),
        };
    }
    </script>
    <script>
        function showCenterToast(message, type = 'success', duration = 2000) {
            const toast = document.createElement('div');
            toast.className = 'toast-center';
            const icons = {
                success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
                error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
                info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>`
            };
            const iconEl = `<span class="toast-icon ${type}">${icons[type] || icons.info}</span>`;
            toast.innerHTML = `${iconEl}<span class="toast-text">${message}</span>`;
            document.body.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('show'));
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 250);
            }, duration);
        }

        function formatBRL(value) {
            const number = Number(value || 0);
            return number.toFixed(2).replace('.', ',');
        }

        // Set dos índices selecionados (por padrão todos)
        let _cartChecked = new Set();

        function _checkboxSVG() {
            return `<svg width="11" height="11" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        function _cbEl(checked) {
            return `<span class="cart-cb" style="width:22px;height:22px;border-radius:50%;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s,border .15s;${checked ? 'background:#fe2d55;border:2px solid #fe2d55;' : 'background:#fff;border:2px solid #ccc;'}">${checked ? _checkboxSVG() : ''}</span>`;
        }
        function _updateCartTotals() {
            const totalEl = document.getElementById('cart-total');
            const countEl = document.getElementById('cart-count-footer');
            const allCbEl = document.getElementById('cart-cb-all');
            let total = 0, count = 0;
            cart.items.forEach((item, idx) => {
                if (_cartChecked.has(idx)) {
                    const d = getProdutoDetalhado(item);
                    total += Number(d.preco || 0) * Number(d.quantidade || 1);
                    count++;
                }
            });
            if (totalEl) totalEl.textContent = 'R$ ' + formatBRL(total);
            if (countEl) countEl.textContent = String(count);
            if (allCbEl) {
                const allChecked = cart.items.length > 0 && _cartChecked.size === cart.items.length;
                allCbEl.style.background = allChecked ? '#fe2d55' : '#fff';
                allCbEl.style.border = allChecked ? '2px solid #fe2d55' : '2px solid #ccc';
                allCbEl.innerHTML = allChecked ? _checkboxSVG() : '';
            }
        }

        function renderCart() {
            const container = document.getElementById('cart-items');
            const emptyCart = document.getElementById('empty-cart');
            const totalEl = document.getElementById('cart-total');
            const countEl = document.getElementById('cart-count-footer');

            if (window.cart && typeof window.cart.updateCartCount === 'function') {
                window.cart.updateCartCount();
            }

            if (!container || !emptyCart || !totalEl) return;

            container.innerHTML = '';

            if (cart.items.length === 0) {
                _cartChecked = new Set();
                container.style.display = 'none';
                emptyCart.classList.remove('hidden');
                totalEl.textContent = 'R$ 0,00';
                if (countEl) countEl.textContent = '0';
                const secProt = document.getElementById('secao-protecao');
                if (secProt) secProt.style.display = 'none';
                const rodape = document.getElementById('rodape-carrinho');
                if (rodape) rodape.style.display = 'none';
                return;
            }

            // Garante que novos itens entrem selecionados
            cart.items.forEach((_, idx) => { if (!_cartChecked.has(idx)) _cartChecked.add(idx); });
            // Remove índices que não existem mais
            for (const idx of _cartChecked) { if (idx >= cart.items.length) _cartChecked.delete(idx); }

            container.style.display = '';
            emptyCart.classList.add('hidden');
            const secProt2 = document.getElementById('secao-protecao');
            if (secProt2) secProt2.style.display = '';
            const rodape2 = document.getElementById('rodape-carrinho');
            if (rodape2) rodape2.style.display = '';

            // Banner topo frete
            const banner = document.createElement('div');
            banner.className = 'cart-top-banner';
            banner.innerHTML = `<img src="/uploads/carrofreteazul.png?v=2" style="width:30px;height:auto;object-fit:contain;flex-shrink:0;"><span class="cart-top-banner-text">Frete grátis em todos os produtos</span>`;
            container.appendChild(banner);

            // Uma seção por item
            cart.items.forEach((item, index) => {
                const d = getProdutoDetalhado(item);
                const tituloCompleto = (() => {
                    const base = d.produtoTitulo || '';
                    const varTit = d.titulo || '';
                    if (base && varTit && base !== varTit) return base + ' - ' + varTit;
                    return base || varTit || '';
                })();

                const precoNum = Number(d.preco || 0);
                const precoInt = Math.floor(precoNum);
                const precoCents = String(Math.round((precoNum - precoInt) * 100)).padStart(2, '0');
                const checked = _cartChecked.has(index);

                const section = document.createElement('div');
                section.className = 'cart-store-section';

                // Cabeçalho com checkbox funcional
                const storeHeader = document.createElement('div');
                storeHeader.className = 'cart-store-header';
                storeHeader.innerHTML = `
                    ${_cbEl(checked)}
                    <span class="cart-store-name">${tituloCompleto.split(' ').slice(0,3).join(' ')}</span>
                    <span class="cart-store-chevron"><i class="fas fa-chevron-right"></i></span>`;
                const cb = storeHeader.querySelector('.cart-cb');
                cb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (_cartChecked.has(index)) { _cartChecked.delete(index); } else { _cartChecked.add(index); }
                    cb.style.background = _cartChecked.has(index) ? '#fe2d55' : '#fff';
                    cb.style.border = _cartChecked.has(index) ? '2px solid #fe2d55' : '2px solid #ccc';
                    cb.innerHTML = _cartChecked.has(index) ? _checkboxSVG() : '';
                    _updateCartTotals();
                });
                section.appendChild(storeHeader);

                // Box frete
                const shippingBox = document.createElement('div');
                shippingBox.className = 'cart-shipping-box';
                shippingBox.innerHTML = `<img src="/uploads/carrofreteazul.png?v=2" style="width:26px;height:auto;object-fit:contain;flex-shrink:0;"><span class="cart-shipping-box-text">Você economizou no frete com frete grátis!</span>`;
                section.appendChild(shippingBox);

                // Produto
                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML = `
                    <img src="${d.imagem || ''}" alt="${tituloCompleto}" class="cart-item-img" loading="lazy" onerror="this.src=''">
                    <div class="cart-item-body">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                            <span class="cart-item-title">${tituloCompleto}</span>
                            <button onclick="cart.removeItem(${index})" class="cart-item-remove"><i class="fas fa-times"></i></button>
                        </div>
                        ${d.variacaoInfo ? `<span class="cart-item-sub">${d.variacaoInfo}</span>` : ''}
                        <div class="cart-item-price-row">
                            <span style="font-size:13px;font-weight:700;color:#fe2d55;">R$</span>
                            <span class="cart-item-price">${precoInt}<span class="cart-item-price-frac">,${precoCents}</span></span>
                            <img src="/uploads/bilhete.png?v=2" class="cart-item-ticket" alt="">
                            ${d.precoComparacao && d.precoComparacao > d.preco ? `<span class="cart-item-oldprice">R$ ${formatBRL(d.precoComparacao)}</span>` : ''}
                            ${d.desconto ? `<span class="cart-item-badge">-${d.desconto}%</span>` : ''}
                        </div>
                        <div class="cart-qty">
                            <button onclick="cart.updateQuantity(${index}, ${d.quantidade - 1})">−</button>
                            <span>${d.quantidade}</span>
                            <button onclick="cart.updateQuantity(${index}, ${d.quantidade + 1})">+</button>
                        </div>
                    </div>`;
                section.appendChild(row);
                container.appendChild(section);
            });

            _updateCartTotals();
            if (typeof renderRecomendacoes === 'function') renderRecomendacoes();
        }

        function _toggleAll() {
            if (_cartChecked.size === cart.items.length) {
                _cartChecked.clear();
            } else {
                cart.items.forEach((_, idx) => _cartChecked.add(idx));
            }
            renderCart();
        }

        function finalizarCompra() {
            if (cart.items.length === 0) {
                showCenterToast('Adicione itens ao carrinho primeiro', 'error');
                return;
            }
            // Salva o carrinho na sessão para o checkout
            sessionStorage.setItem('checkoutCarrinho', JSON.stringify(cart.items));
            window.location.href = 'checkout.html';
        }

        // Inicializa o carrinho e renderiza
        document.addEventListener('DOMContentLoaded', () => {
            cart.init();
            renderCart();
        });

        // Caso outro script/aba altere o localStorage, atualiza a UI
        window.addEventListener('storage', (e) => {
            if (e.key === 'carrinho') {
                try { cart.items = JSON.parse(e.newValue || '[]'); } catch(_) { cart.items = []; }
                renderCart();
            }
        });
    </script>
    <script>
        // Bloqueia zoom por gesto ou ctrl + scroll para manter layout do carrinho
        document.addEventListener('wheel', function (e) {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        }, { passive: false });

        document.addEventListener('touchmove', function (e) {
            if (e.touches && e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    </script>
    <script>
    let _countdownSecs = 20 * 60;
    function _fmtCountdown(s) {
        const m = String(Math.floor(s/60)).padStart(2,'0');
        const ss = String(s%60).padStart(2,'0');
        return '00:' + m + ':' + ss;
    }
    setInterval(function() {
        if (_countdownSecs > 0) _countdownSecs--;
        const t = _fmtCountdown(_countdownSecs);
        document.querySelectorAll('.oferta-timer').forEach(function(el){ el.textContent = t; });
    }, 1000);
    </script>
    <!-- meuModal completo com variações — idêntico ao index.html -->
    <style>
      .dots-line { position: relative; width: 44px; height: 12px; }
      .dots-line .dot { position: absolute; top: 2px; width: 10px; height: 10px; border-radius: 50%; opacity: .9; }
      .dots-line .dot.dot-red { left: 0; background: #fe2d55; animation: slide-right .9s ease-in-out infinite; }
      .dots-line .dot.dot-cyan { right: 0; background: #00f2ea; animation: slide-left .9s ease-in-out infinite; }
      @keyframes slide-right { 0% { transform: translateX(0); opacity:.6;} 50% { transform: translateX(18px); opacity:1;} 100% { transform: translateX(0); opacity:.6;} }
      @keyframes slide-left  { 0% { transform: translateX(0); opacity:.6;} 50% { transform: translateX(-18px); opacity:1;} 100% { transform: translateX(0); opacity:.6;} }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      #buy-positions {
        position: -webkit-sticky;
        position: sticky;
        bottom: 0; left: 0; right: 0;
        z-index: 30;
        background: transparent;
        box-shadow: none;
        padding-top: 18px;
        padding-right: 16px;
        padding-left: 16px;
        padding-bottom: 12px;
        padding-bottom: calc(12px + env(safe-area-inset-bottom));
        margin-top: 0;
        border-radius: 0px !important;
        text-transform: uppercase;
      }
      .variation-card {
        display: flex; flex-direction: column; align-items: center; gap: 0;
        width: 120px; flex: 0 0 auto; padding: 0;
        border: 1px solid #d1d5db; border-radius: 16px;
        background: #f3f4f6; box-shadow: none; position: relative;
        cursor: pointer;
        transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
        overflow: hidden;
      }
      .variation-card.is-size { width: auto; min-width: 48px; border-radius: 8px; background: #fff; border: 1.5px solid #d1d5db; }
      .variation-card.is-size .variation-image-wrap { display: none; }
      .variation-card.is-size .variation-label-wrap { min-height: unset; padding: 8px 14px; background: transparent; border-top: none; }
      .variation-card.is-size .variation-label { font-size: 13px; font-weight: 600; text-align: center; line-height: 1.3; display: block; overflow: visible; color: #111; }
      .variation-card.is-size.is-selected { border-color: #111; border-width: 2px; }
      .variation-card.is-size.is-selected::after { display: none; }
      .variation-row-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
      .variation-row-grid .variation-card { width: 100%; flex: none; }
      .variation-card:hover { box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
      .variation-card.is-selected { box-shadow: 0 3px 8px rgba(0,0,0,0.12); }
      .variation-card.is-selected::after { content:''; position:absolute; inset:0; border:2px solid #fb7185; border-radius:16px; pointer-events:none; }
      .variation-row { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px; scroll-snap-type: x proximity; }
      .variation-row::-webkit-scrollbar { display: none; }
      .variation-row { -ms-overflow-style: none; scrollbar-width: none; }
      .variation-image-wrap { width:100%; height:100px; border-radius:0; background:transparent; border:none; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; padding:6px; box-sizing:border-box; }
      .variation-image { width:100%; height:100%; object-fit:contain; }
      .variation-label-wrap { width:100%; background:#fff; border-top:1px solid #e5e7eb; padding:6px 4px 8px; display:flex; align-items:center; justify-content:center; min-height:32px; box-sizing:border-box; }
      .variation-label { font-size:12px; font-weight:600; color:#111827; }
      .variation-zoom { position:absolute; top:8px; left:8px; width:22px; height:22px; border-radius:999px; border:none; background:rgba(156,163,175,0.9); color:#fff; font-size:10px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; }
      .image-viewer { position:fixed; inset:0; display:none; align-items:center; justify-content:center; z-index:99999; }
      .image-viewer.show { display:flex; }
      .image-viewer-backdrop { position:absolute; inset:0; background:#000; }
      .image-viewer-content { position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; z-index:1; touch-action:pan-y; }
      .image-viewer-close { position:absolute; top:20px; left:16px; width:44px; height:44px; border:none; background:transparent; color:#fff; font-size:34px; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1; }
      .image-viewer-nav { display:none !important; }
      .image-viewer-counter { position:absolute; top:20px; right:20px; color:#fff; font-size:16px; font-weight:600; }
      .image-viewer-img-wrap { background:#fff; display:flex; align-items:center; justify-content:center; width:88vw; max-width:480px; padding:20px; box-sizing:border-box; }
      .image-viewer-img-wrap img { max-width:100%; max-height:72vh; object-fit:contain; display:block; }
      .image-viewer-title { position:absolute; bottom:28px; left:0; right:0; text-align:center; color:#fff; font-size:15px; font-weight:400; }
    </style>

    <div id="imageViewer" class="image-viewer" aria-hidden="true">
      <div class="image-viewer-backdrop" id="imageViewerBackdrop"></div>
      <div class="image-viewer-content" id="imageViewerContent" role="dialog" aria-modal="true">
        <button type="button" class="image-viewer-close" id="imageViewerClose" aria-label="Fechar">&times;</button>
        <div id="imageViewerCounter" class="image-viewer-counter"></div>
        <div class="image-viewer-img-wrap">
          <img id="imageViewerImg" src="" alt="Imagem do produto">
        </div>
        <div id="imageViewerTitle" class="image-viewer-title"></div>
        <button type="button" class="image-viewer-nav prev" id="imageViewerPrev" aria-label="Anterior">&#10094;</button>
        <button type="button" class="image-viewer-nav next" id="imageViewerNext" aria-label="Proximo">&#10095;</button>
      </div>
    </div>

    <div id="meuModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center hidden" style="z-index:9500;">
      <div class="bg-white p-4 w-full max-w-lg relative" style="position:fixed; bottom:0; left:0; right:0; overflow-y: auto; -webkit-overflow-scrolling: touch; max-height: 85vh; box-shadow: none; border-radius:0; margin:0 auto; max-width:480px; padding-bottom: calc(16px + env(safe-area-inset-bottom));">
        <button onclick="fecharModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold" aria-label="Fechar">×</button>
        <div id="modal-loader" class="w-full flex items-center justify-center py-14">
          <div class="dots-line" aria-label="Carregando">
            <span class="dot dot-red"></span>
            <span class="dot dot-cyan"></span>
          </div>
        </div>
        <div id="modal-conteudo" class="hidden" style="padding-bottom:0;">
          <div style="display:flex;gap:12px;padding:4px 0 10px;">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="Produto" id="img-solts" style="width:80px;height:80px;min-width:80px;object-fit:contain;border-radius:8px;background:#f5f5f5;display:block;" loading="lazy">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <span id="div_ors_badge" style="background:#fe2d55;color:#fff;font-weight:700;padding:2px 7px;border-radius:6px;font-size:13px;flex-shrink:0;"></span>
                <span style="color:#fe2d55;font-size:13px;white-space:nowrap;">A partir de R$</span>
                <span id="div_ors_3" style="color:#fe2d55;font-size:22px;font-weight:800;line-height:1;"></span>
              </div>
              <div style="margin-bottom:6px;">
                <span id="div_ors_2" style="color:#aaa;font-size:13px;text-decoration:line-through;"></span>
              </div>
              <div id="modal-bilhete-chip" style="display:inline-flex;align-items:center;gap:4px;background:#fff0f3;border-radius:4px;padding:3px 8px;">
                <img src="/uploads/bilhete.png?v=2" style="height:11px;width:auto;display:block;">
                <span id="modal-bilhete-text" style="color:#fe2d55;font-size:11px;font-weight:700;">Desconto exclusivo</span>
              </div>
            </div>
          </div>
          <div id="modal-oferta-banner" style="display:none;margin-bottom:12px;">
            <span class="oferta-badge-wrap" style="display:inline-flex;align-items:center;border-radius:4px;overflow:hidden;flex-shrink:0;height:20px;background:#e8562a;">
              <img src="/uploads/oferta-relamapago.png?v=2" style="height:20px;width:auto;display:block;">
              <span class="oferta-timer" style="background:#fff0e8;color:#e8562a;font-size:11px;font-weight:800;padding:0 8px;height:100%;display:flex;align-items:center;">00:20:00</span>
            </span>
          </div>
          <div id="chatsw-variacoes" style="margin-top:4px;">
            <div id="titulo-variacoes"></div>
            <div id="grid-variacoes"></div>
          </div>
          <div id="buy-positions">
            <a href="javascript:void(0);" onclick="comprarAgora()" id="div_ors_4" class="w-full text-white text-center block" style="font-size:16px;font-weight:700;border-radius:999px;padding:14px;background:#fe2d55;outline:none;-webkit-tap-highlight-color:transparent;box-shadow:none;">Adicionar ao carrinho</a>
          </div>
        </div>
      </div>
    </div>

    <script>
    // Produtos carregados via fetch('produtos.json') → produtosSistema

    const FALLBACK_MEDIA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    let bodyScrollY = 0;
    let produtoSelecionado = null;
    let variacoesSelecionadasPorTipo = {};
    let modalProdutoAtual = null;
    let galleryImages = [];
    let galleryIndex = 0;

    function t(key) {
      var map = {
        no_variations: 'Este produto não possui variações cadastradas.',
        quantity: 'Quantidade',
        variations: 'Variações',
        select_variation_first: 'Selecione uma variação para continuar.',
        already_in_cart: 'Este produto já está no seu carrinho.',
        added_to_cart: 'Adicionado ao carrinho',
        album_and_pack_added: 'Álbum e pacote adicionados ao carrinho.',
        some_items_already_in_cart: 'Alguns itens já estavam no carrinho.'
      };
      return map[key] || key;
    }

    function resolveMediaPath(path, base) {
      if (!path) return FALLBACK_MEDIA;
      if (/^https?:\/\//i.test(path) || /^data:/i.test(path)) return path;
      var raw = String(path).trim().replace(/^\.\//,'');
      try {
        if (base) {
          var baseUrl = /^https?:/i.test(base) ? base : new URL(base.replace(/^\.\//,''), document.baseURI).toString();
          return new URL(raw, baseUrl).toString();
        }
        if (raw.startsWith('/')) return new URL(raw, window.location.origin || document.baseURI).toString();
        if (raw.includes('/')) return new URL('/'+raw.replace(/^\/+/,''), window.location.origin || document.baseURI).toString();
        return new URL(raw, document.baseURI).toString();
      } catch(e) {
        return raw.startsWith('/') ? raw : '/'+raw;
      }
    }

    function buildGalleryImages(primary, extras) {
      if (!extras) extras = [];
      var list = [];
      function add(value) {
        if (!value) return;
        var resolved = resolveMediaPath(value);
        if (resolved && list.indexOf(resolved) === -1) list.push(resolved);
      }
      add(primary);
      if (Array.isArray(extras)) extras.forEach(add);
      if (!list.length) list.push(FALLBACK_MEDIA);
      return list;
    }

    function calcularDesconto(preco, precoComparacao) {
      var vp = Number(preco || 0), vc = Number(precoComparacao || 0);
      if (!vc || vc <= vp) return 0;
      return Math.round(((vc - vp) / vc) * 100);
    }

    function showImageViewerIndex(index) {
      if (!galleryImages.length) return;
      var total = galleryImages.length;
      galleryIndex = (index + total) % total;
      var img = document.getElementById('imageViewerImg');
      if (img) { img.onerror = function(){ img.onerror=null; img.src=FALLBACK_MEDIA; }; img.src = galleryImages[galleryIndex]; }
      var counter = document.getElementById('imageViewerCounter');
      if (counter) counter.textContent = total > 1 ? (galleryIndex+1)+' / '+total : '';
    }

    function openImageViewer(images, startIndex, title) {
      if (startIndex === undefined) startIndex = 0;
      if (!title) title = '';
      var viewer = document.getElementById('imageViewer');
      if (!viewer) return;
      var list = Array.isArray(images) ? images.filter(Boolean) : [];
      galleryImages = list.length ? list : [FALLBACK_MEDIA];
      var initial = Math.max(0, Math.min(startIndex, galleryImages.length-1));
      var titleEl = document.getElementById('imageViewerTitle');
      if (titleEl) titleEl.textContent = title;
      showImageViewerIndex(initial);
      viewer.classList.add('show');
      viewer.setAttribute('aria-hidden','false');
    }

    function closeImageViewer() {
      var viewer = document.getElementById('imageViewer');
      if (!viewer) return;
      viewer.classList.remove('show');
      viewer.setAttribute('aria-hidden','true');
    }

    function abrirModal() {
      var modal = document.getElementById('meuModal');
      if (!modal) return;
      bodyScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = '-'+bodyScrollY+'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hidden');
    }

    function fecharModal() {
      var modal = document.getElementById('meuModal');
      if (modal) modal.classList.add('hidden');
      document.body.style.removeProperty('position');
      var top = document.body.style.top;
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('overflow');
      var y = top ? parseInt(top,10) : 0;
      window.scrollTo(0, (y && !Number.isNaN(y)) ? -y : (bodyScrollY||0));
      produtoSelecionado = null;
      variacoesSelecionadasPorTipo = {};
    }

    function renderVariacoes(variacoes) {
      if (!variacoes) variacoes = [];
      var grid = document.getElementById('grid-variacoes');
      if (!grid) return;
      grid.innerHTML = '';
      variacoesSelecionadasPorTipo = {};

      if (!variacoes.length) {
        var aviso = document.createElement('p');
        aviso.style.cssText = 'font-size:14px;color:#6b7280;';
        aviso.textContent = t('no_variations');
        grid.appendChild(aviso);
        return;
      }

      var grupos = {};
      variacoes.forEach(function(v, idx) {
        var tipo = String(v.tipo || 'variacao').toLowerCase();
        if (!grupos[tipo]) grupos[tipo] = [];
        var preco = Number(v.preco || 0);
        var precoComparacao = Number(v.precoComparacao || v.preco_comparacao || preco);
        if (!precoComparacao || isNaN(precoComparacao) || precoComparacao <= 0) precoComparacao = preco;
        var desconto = Number(v.desconto || 0);
        if (!desconto || isNaN(desconto)) desconto = calcularDesconto(preco, precoComparacao);
        var entry = Object.assign({}, v, {
          idx: idx, tipo: tipo,
          titulo: v.titulo || '',
          preco: preco, precoComparacao: precoComparacao, desconto: desconto,
          checkoutLink: v.checkoutLink || v.link_checkout || '',
          imagem: resolveMediaPath(v.imagem || (modalProdutoAtual ? modalProdutoAtual.imagemPrincipal || '' : ''))
        });
        grupos[tipo].push(entry);
      });

      Object.keys(grupos).forEach(function(tipo) {
        var labelText = tipo==='cor' ? 'Cor' : tipo==='tamanho' ? 'Tamanho' : tipo.charAt(0).toUpperCase()+tipo.slice(1);
        var count = grupos[tipo].length;
        var groupTitle = document.createElement('div');
        groupTitle.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin:10px 0 8px;';
        var titleLeft = document.createElement('span');
        titleLeft.style.cssText = 'font-size:14px;font-weight:700;color:#111;';
        titleLeft.textContent = labelText+' ('+count+')';
        groupTitle.appendChild(titleLeft);
        if (tipo === 'tamanho') {
          var guia = document.createElement('span');
          guia.style.cssText = 'font-size:13px;color:#1890ff;cursor:pointer;';
          guia.textContent = 'Guia de tamanhos';
          groupTitle.appendChild(guia);
        }
        grid.appendChild(groupTitle);

        var row = document.createElement('div');
        row.className = (tipo==='cor') ? 'variation-row-grid' : 'variation-row scrollbar-hide';

        var groupGallery = buildGalleryImages(
          modalProdutoAtual ? modalProdutoAtual.imagemPrincipal || '' : '',
          grupos[tipo].map(function(v){ return v.imagem || ''; })
        );

        grupos[tipo].forEach(function(variacao, optionIndex) {
          var btn = document.createElement('div');
          btn.className = 'variation-card'+(tipo==='tamanho' ? ' is-size' : '');
          btn.setAttribute('role','button');
          btn.setAttribute('tabindex','0');
          btn.setAttribute('data-index', String(variacao.idx));
          btn.setAttribute('data-tipo', variacao.tipo);
          btn.setAttribute('data-variacao-id', String(variacao.id || ''));
          btn.setAttribute('data-variation','1');

          var imageWrap = document.createElement('div');
          imageWrap.className = 'variation-image-wrap';
          var imageEl = document.createElement('img');
          imageEl.className = 'variation-image';
          imageEl.alt = variacao.titulo;
          imageEl.src = variacao.imagem || FALLBACK_MEDIA;
          imageEl.loading = 'lazy';
          imageEl.onerror = function(){ imageEl.onerror=null; imageEl.src=FALLBACK_MEDIA; };
          imageWrap.appendChild(imageEl);

          var zoomBtn = document.createElement('button');
          zoomBtn.type = 'button';
          zoomBtn.className = 'variation-zoom';
          zoomBtn.innerHTML = '<i class="fas fa-up-right-and-down-left-from-center"></i>';
          (function(vr){
            zoomBtn.addEventListener('click', function(event) {
              event.stopPropagation();
              if (!groupGallery.length) return;
              var startIndex = Math.max(0, groupGallery.indexOf(vr.imagem));
              openImageViewer(groupGallery, startIndex, vr.titulo || '');
            });
          })(variacao);
          imageWrap.appendChild(zoomBtn);

          var label = document.createElement('span');
          label.className = 'variation-label';
          var words = (variacao.titulo || '').split(' ');
          label.textContent = words.length > 4 ? words.slice(0,4).join(' ')+'…' : variacao.titulo;
          var labelWrap = document.createElement('div');
          labelWrap.className = 'variation-label-wrap';
          labelWrap.appendChild(label);

          if (tipo !== 'tamanho') btn.appendChild(imageWrap);
          btn.appendChild(labelWrap);

          var selecionarOpcao = (function(b, r, vr, tp) {
            return function() {
              r.querySelectorAll('.variation-card.is-selected').forEach(function(c){ c.classList.remove('is-selected'); });
              b.classList.add('is-selected');
              variacoesSelecionadasPorTipo[tp] = vr;
              atualizarResumoSelecaoModal();
            };
          })(btn, row, variacao, tipo);

          btn.addEventListener('click', selecionarOpcao);
          btn.addEventListener('keydown', function(event) {
            if (event.key==='Enter' || event.key===' ') { event.preventDefault(); selecionarOpcao(); }
          });
          row.appendChild(btn);

          if (optionIndex === 0) {
            btn.classList.add('is-selected');
            variacoesSelecionadasPorTipo[tipo] = variacao;
          }
        });

        grid.appendChild(row);
      });

      atualizarResumoSelecaoModal();

      var contentEl = document.getElementById('modal-conteudo') || grid.parentNode;
      var buyBox = document.getElementById('buy-positions');
      if (!buyBox) {
        buyBox = document.createElement('div');
        buyBox.id = 'buy-positions';
        contentEl.appendChild(buyBox);
      }
      buyBox.innerHTML = '<a href="javascript:void(0);" onclick="comprarAgora()" id="div_ors_4" class="w-full text-white text-center block" style="font-size:16px;font-weight:700;border-radius:999px;padding:14px;background:#fe2d55;outline:none;-webkit-tap-highlight-color:transparent;box-shadow:none;">Adicionar ao carrinho</a>';

      var qtyBox = document.getElementById('qty-row');
      if (!qtyBox) {
        qtyBox = document.createElement('div');
        qtyBox.id = 'qty-row';
        qtyBox.className = 'mt-4 mb-2';
        contentEl.insertBefore(qtyBox, buyBox);
      }
      qtyBox.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin:14px 0 12px;"><span style="font-size:14px;font-weight:700;color:#111;">'+t('quantity')+'</span><div style="display:flex;align-items:center;background:#f5f5f5;border-radius:8px;overflow:hidden;"><button type="button" id="qtd-menos" style="width:36px;height:36px;border:none;background:transparent;font-size:20px;color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:300;">−</button><input type="number" id="qtd-input" value="1" min="1" style="width:36px;text-align:center;border:none;background:transparent;font-size:15px;font-weight:700;color:#111;outline:none;" /><button type="button" id="qtd-mais" style="width:36px;height:36px;border:none;background:transparent;font-size:20px;color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:300;">+</button></div></div>';

      var input = qtyBox.querySelector('#qtd-input');
      var btnMenos = qtyBox.querySelector('#qtd-menos');
      var btnMais = qtyBox.querySelector('#qtd-mais');
      btnMenos.addEventListener('click', function(){
        var v = parseInt(input.value,10)||1;
        if(v>1) v--;
        input.value = v;
        if(produtoSelecionado) produtoSelecionado.quantidade = v;
      });
      btnMais.addEventListener('click', function(){
        var v = parseInt(input.value,10)||1;
        v++;
        input.value = v;
        if(produtoSelecionado) produtoSelecionado.quantidade = v;
      });
      input.addEventListener('change', function(){
        var v = parseInt(input.value,10);
        if(!v||v<1) v=1;
        input.value = v;
        if(produtoSelecionado) produtoSelecionado.quantidade = v;
      });
      if (produtoSelecionado) produtoSelecionado.quantidade = parseInt(input.value,10)||1;
    }

    function atualizarResumoSelecaoModal() {
      if (!modalProdutoAtual) return;
      var variacaoCor = variacoesSelecionadasPorTipo.cor || null;
      var variacaoTamanho = variacoesSelecionadasPorTipo.tamanho || null;
      var temGrupoCor = Array.isArray(modalProdutoAtual.variacoes) && modalProdutoAtual.variacoes.some(function(v){ return String(v.tipo||'').toLowerCase()==='cor'; });
      var usarTamanhoComoPrincipal = !temGrupoCor && !!variacaoTamanho;
      var variacaoPrincipal = usarTamanhoComoPrincipal ? variacaoTamanho : variacaoCor;
      var variacaoPacote = usarTamanhoComoPrincipal ? null : variacaoTamanho;

      var tituloAlbum = variacaoPrincipal ? (variacaoPrincipal.titulo || modalProdutoAtual.titulo || '') : (modalProdutoAtual.titulo || '');
      var tituloPacote = variacaoPacote ? (variacaoPacote.titulo || '') : '';
      var tituloFinal = tituloPacote ? tituloAlbum+' ('+tituloPacote+')' : tituloAlbum;

      var precoAlbum = Number(variacaoPrincipal ? (variacaoPrincipal.preco !== undefined ? variacaoPrincipal.preco : (modalProdutoAtual.preco||0)) : (modalProdutoAtual.preco||0));
      var precoAlbumComparacaoRaw = Number(variacaoPrincipal ? (variacaoPrincipal.precoComparacao !== undefined ? variacaoPrincipal.precoComparacao : (modalProdutoAtual.precoComparacao||precoAlbum)) : (modalProdutoAtual.precoComparacao||precoAlbum));
      var precoAlbumComparacao = (precoAlbumComparacaoRaw > 0) ? precoAlbumComparacaoRaw : precoAlbum;
      var precoTotal = precoAlbum;
      var precoComparacaoTotal = precoAlbumComparacao;
      var descontoTotal = calcularDesconto(precoTotal, precoComparacaoTotal);

      var imagemAlbum = variacaoPrincipal ? (variacaoPrincipal.imagem || modalProdutoAtual.imagemPrincipal || FALLBACK_MEDIA) : (modalProdutoAtual.imagemPrincipal || FALLBACK_MEDIA);
      var imagemPrincipal = imagemAlbum;
      var fotosPrincipais = buildGalleryImages(imagemPrincipal, [imagemAlbum].concat(Array.isArray(modalProdutoAtual.fotos) ? modalProdutoAtual.fotos : []));

      var badgeEl = document.getElementById('div_ors_badge');
      if (badgeEl) badgeEl.textContent = '-'+Math.round(descontoTotal)+'%';
      var precoEl = document.getElementById('div_ors_3');
      if (precoEl) precoEl.textContent = formatBRL(precoTotal);
      var precoCompEl = document.getElementById('div_ors_2');
      if (precoCompEl) precoCompEl.textContent = (precoComparacaoTotal > precoTotal) ? 'R$ '+formatBRL(precoComparacaoTotal) : '';
      var bilheteText = document.getElementById('modal-bilhete-text');
      if (bilheteText && descontoTotal > 0) bilheteText.textContent = Math.round(descontoTotal)+'% de desconto';
      var ofertaBanner = document.getElementById('modal-oferta-banner');
      if (ofertaBanner) ofertaBanner.style.display = (modalProdutoAtual && modalProdutoAtual.promo_ativa) ? 'flex' : 'none';
      var modalImg = document.getElementById('img-solts');
      if (modalImg) {
        if (usarTamanhoComoPrincipal) {
          modalImg.style.display = 'none';
        } else {
          modalImg.style.display = 'block';
          modalImg.onerror = function(){ modalImg.onerror=null; modalImg.src=FALLBACK_MEDIA; };
          modalImg.src = imagemPrincipal || FALLBACK_MEDIA;
        }
      }

      var checkoutDefault = (modalProdutoAtual && modalProdutoAtual.checkoutUrl) || 'checkout.html';
      var itemAlbum = {
        produtoId: modalProdutoAtual ? (modalProdutoAtual.id !== undefined ? modalProdutoAtual.id : null) : null,
        variacaoId: variacaoPrincipal ? (variacaoPrincipal.id !== undefined ? variacaoPrincipal.id : null) : null,
        tipoVariacao: usarTamanhoComoPrincipal ? 'tamanho' : 'cor',
        titulo: tituloFinal,
        preco: precoAlbum, precoComparacao: precoAlbumComparacao,
        desconto: calcularDesconto(precoAlbum, precoAlbumComparacao),
        link_checkout: variacaoPrincipal ? (variacaoPrincipal.checkoutLink || checkoutDefault) : checkoutDefault,
        imagem: imagemAlbum,
        fotos: buildGalleryImages(imagemAlbum, modalProdutoAtual ? modalProdutoAtual.fotos : []),
        quantidade: 1
      };

      produtoSelecionado = Object.assign({}, itemAlbum, {
        titulo: tituloFinal, preco: precoTotal, precoComparacao: precoComparacaoTotal,
        desconto: descontoTotal, imagem: imagemPrincipal, fotos: fotosPrincipais,
        quantidade: 1, comboItens: [itemAlbum]
      });
    }

    function normalizarProduto(produto) {
      var fotos = Array.isArray(produto.fotos) ? produto.fotos : [];
      var imagemPrincipal = resolveMediaPath(produto.imagemPrincipal || (fotos[0] || produto.imagem || ''));
      var preco = Number(produto.preco || 0);
      var precoComparacao = Number(produto.preco_comparacao || produto.precoComparacao || 0);
      if (!precoComparacao || isNaN(precoComparacao) || precoComparacao <= preco) precoComparacao = preco;
      var desconto = Number(produto.desconto || 0);
      if (!desconto || isNaN(desconto)) desconto = (precoComparacao > preco && precoComparacao > 0) ? Math.round(((precoComparacao - preco) / precoComparacao) * 100) : 0;
      var variacoes = Array.isArray(produto.variacoes) ? produto.variacoes.map(function(v) {
        var vp = Number(v.preco || preco);
        var vc = Number(v.preco_comparacao || v.precoComparacao || precoComparacao || vp);
        if (!vc || isNaN(vc) || vc <= vp) vc = precoComparacao > vp ? precoComparacao : vp;
        var vd = Number(v.desconto || 0);
        if (!vd || isNaN(vd)) vd = (vc > vp && vc > 0) ? Math.round(((vc-vp)/vc)*100) : 0;
        return {
          id: v.id !== undefined ? v.id : null,
          titulo: v.titulo || '', tipo: v.tipo || 'tamanho',
          preco: vp, precoComparacao: vc, desconto: vd,
          info: v.info || '', checkoutLink: v.link_checkout || '',
          imagem: resolveMediaPath(v.imagem || imagemPrincipal)
        };
      }) : [];
      return Object.assign({}, produto, {
        imagemPrincipal: imagemPrincipal, fotos: fotos,
        preco: preco, precoComparacao: precoComparacao, desconto: desconto,
        variacoes: variacoes,
        checkoutUrl: produto.checkoutUrl || produto.link_checkout || 'checkout.html'
      });
    }

    function abrirModalProduto(produto) {
      modalProdutoAtual = produto;
      produtoSelecionado = null;
      variacoesSelecionadasPorTipo = {};
      abrirModal();
      var loader = document.getElementById('modal-loader');
      var conteudo = document.getElementById('modal-conteudo');
      if (loader && conteudo) { loader.classList.remove('hidden'); conteudo.classList.add('hidden'); }

      setTimeout(function() {
        var img = document.getElementById('img-solts');
        var precoEl = document.getElementById('div_ors_3');
        var precoCompEl = document.getElementById('div_ors_2');
        var temCorInicial = Array.isArray(produto.variacoes) && produto.variacoes.some(function(v){ return String(v.tipo||'').toLowerCase()==='cor'; });
        if (img) {
          if (!temCorInicial) { img.style.display = 'none'; }
          else { img.style.display='block'; img.onerror=function(){img.onerror=null;img.src=FALLBACK_MEDIA;}; img.src=produto.imagemPrincipal||FALLBACK_MEDIA; }
        }
        if (precoEl) precoEl.innerHTML = '<span style="color:#fe2d55;font-size:1.3rem;font-weight:700;">R$ '+formatBRL(produto.preco)+'</span>';
        if (precoCompEl) precoCompEl.innerHTML = produto.precoComparacao && produto.precoComparacao > produto.preco ? '<span style="color:#aaa;text-decoration:line-through;font-size:1rem;">R$ '+formatBRL(produto.precoComparacao)+'</span>' : '';

        if (produto.variacoes.length === 0) {
          var gImgs = buildGalleryImages(produto.imagemPrincipal, produto.fotos);
          produtoSelecionado = {
            produtoId: produto.id !== undefined ? produto.id : null, variacaoId: null,
            titulo: produto.titulo, preco: produto.preco, precoComparacao: produto.precoComparacao,
            desconto: produto.desconto, link_checkout: produto.checkoutUrl,
            imagem: gImgs[0] || FALLBACK_MEDIA, fotos: gImgs, quantidade: 1
          };
        }

        document.getElementById('titulo-variacoes').textContent = produto.variacoes.length ? t('variations') : 'Produto';
        renderVariacoes(produto.variacoes);

        if (loader && conteudo) { loader.classList.add('hidden'); conteudo.classList.remove('hidden'); }
      }, 400);
    }

    function comprarAgora() {
      if (!produtoSelecionado) { showCenterToast(t('select_variation_first'), 'error', 2200); return; }
      var qtdInput = document.getElementById('qtd-input');
      var quantidade = 1;
      if (qtdInput) { quantidade = parseInt(qtdInput.value,10); if(!quantidade||quantidade<1) quantidade=1; }
      produtoSelecionado.quantidade = quantidade;

      var itensParaAdicionar = (Array.isArray(produtoSelecionado.comboItens) && produtoSelecionado.comboItens.length)
        ? produtoSelecionado.comboItens : [produtoSelecionado];

      var adicionados = 0, duplicados = 0;
      itensParaAdicionar.forEach(function(itemBase) {
        var item = Object.assign({}, itemBase, { quantidade: quantidade });
        if (window.cart && typeof window.cart.addItem === 'function') {
          var currentItems = window.cart.items || [];
          var existe = currentItems.some(function(p){
            return String(p.titulo||'')===String(item.titulo||'') && String(p.variacaoId||'')===String(item.variacaoId||'');
          });
          if (existe) { duplicados++; return; }
          window.cart.addItem(item);
          adicionados++;
        }
      });

      if (!adicionados) { showCenterToast(t('already_in_cart'), 'info', 2200); return; }
      fecharModal();
      setTimeout(function() {
        renderCart();
        showCenterToast(adicionados > 1 ? t('album_and_pack_added') : t('added_to_cart'), 'success', 1800);
        if (duplicados > 0) setTimeout(function(){ showCenterToast(t('some_items_already_in_cart'), 'info', 1800); }, 350);
      }, 320);
    }

    function renderRecomendacoes() {
        var grid = document.getElementById('rec-grid');
        if (!grid || !produtosSistema.length) return;
        var idsNoCarrinho = new Set((cart.items || []).map(function (i) {
            return String(i.produtoId || i.id || i.produto_id || '');
        }));
        var lista = produtosSistema.filter(function (p) {
            return !idsNoCarrinho.has(String(p.id));
        }).slice(0, 4);
        grid.innerHTML = '';
        lista.forEach(function (produto) {
            var norm = normalizarProduto(produto);
            var pid = norm.id;
            var pct = norm.precoComparacao > norm.preco
                ? Math.round(((norm.precoComparacao - norm.preco) / norm.precoComparacao) * 100)
                : Math.round(norm.desconto || 0);
            var card = document.createElement('div');
            card.style.cssText = 'background:#fff;border:1px solid #f3f4f6;border-radius:12px;padding:10px;display:flex;flex-direction:column;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06);min-width:0;';
            card.onclick = function () {
                window.location.href = 'produto.html?produto_id=' + encodeURIComponent(pid);
            };
            card.innerHTML =
                '<div style="width:100%;height:140px;margin-bottom:8px;border-radius:6px;overflow:hidden;background:#f9f9f9;">' +
                '<img src="' + (norm.imagemPrincipal || '') + '" alt="" style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy" onerror="this.style.opacity=0.3">' +
                '</div>' +
                '<div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">' +
                '<div>' +
                '<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;">' +
                '<img src="/uploads/tagoficial.png" style="height:12px;width:auto;display:block;flex-shrink:0;">' +
                '</div>' +
                '<div style="font-size:12px;font-weight:600;color:#111;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:5px;height:32px;">' + (norm.titulo || '') + '</div>' +
                '<div style="display:flex;flex-wrap:nowrap;gap:3px;margin-bottom:4px;overflow:hidden;align-items:center;height:15px;">' +
                '<span style="background:#ffd0d9;color:#d6003a;font-size:9.5px;font-weight:700;padding:0 5px;border-radius:3px;display:inline-flex;align-items:center;gap:2px;white-space:nowrap;flex-shrink:0;height:15px;box-sizing:border-box;">' +
                '<img src=\'/uploads/bilhete.png?v=2\' width=\'9\' height=\'9\' alt=\'\' style=\'display:block;flex-shrink:0;\'/>' +
                pct + '% OFF</span>' +
                '</div>' +
                '</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">' +
                '<div>' +
                '<div style="font-size:16px;font-weight:700;color:#fe2d55;line-height:1.1;margin-bottom:1px;">R$ ' + formatBRL(norm.preco) + '</div>' +
                '<div style="font-size:10px;color:#9ca3af;text-decoration:line-through;">R$ ' + formatBRL(norm.precoComparacao) + '</div>' +
                '</div>' +
                '<button data-rec-add type="button" style="background:#ffe0e6;border:none;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">' +
                '<img src="/uploads/carrinho-rosa.png?v=3" style="width:28px;height:28px;object-fit:contain;">' +
                '</button></div></div>';
            var btn = card.querySelector('[data-rec-add]');
            if (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    openRecModal(pid);
                });
            }
            grid.appendChild(card);
        });
    }

    function openRecModal(id) {
      var produto = produtosSistema.find(function(p){ return String(p.id) === String(id); });
      if (!produto) return;
      abrirModalProduto(normalizarProduto(produto));
    }

    document.addEventListener('DOMContentLoaded', function() {
      var imageViewerClose = document.getElementById('imageViewerClose');
      var imageViewerBackdrop = document.getElementById('imageViewerBackdrop');
      var imageViewerPrev = document.getElementById('imageViewerPrev');
      var imageViewerNext = document.getElementById('imageViewerNext');
      if (imageViewerClose) imageViewerClose.addEventListener('click', closeImageViewer);
      if (imageViewerBackdrop) imageViewerBackdrop.addEventListener('click', closeImageViewer);
      if (imageViewerPrev) imageViewerPrev.addEventListener('click', function(){ showImageViewerIndex(galleryIndex-1); });
      if (imageViewerNext) imageViewerNext.addEventListener('click', function(){ showImageViewerIndex(galleryIndex+1); });
      var meuModal = document.getElementById('meuModal');
      if (meuModal) meuModal.addEventListener('click', function(e){ if(e.target===meuModal) fecharModal(); });
    });
    </script>

    <!-- Modal Proteção do Cliente -->
    <style>
      #modalProtecao {
        position: fixed; inset: 0; z-index: 9600;
        background: rgba(0,0,0,0.5);
        display: none; align-items: flex-end; justify-content: center;
      }
      #modalProtecao.show { display: flex; }
      #modalProtecaoPainel {
        background: #f5efe3;
        width: 100%; max-width: 480px; max-height: 90vh;
        overflow-y: auto; -webkit-overflow-scrolling: touch;
        border-radius: 20px 20px 0 0;
        padding: 24px 20px calc(24px + env(safe-area-inset-bottom));
        position: relative;
      }
      .prot-close {
        position: absolute; top: 16px; right: 16px;
        width: 32px; height: 32px; border: none; background: transparent;
        font-size: 22px; color: #555; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .prot-watermark {
        position: absolute; top: 10px; right: 20px;
        font-size: 80px; opacity: 0.07; color: #7a5c1e;
        pointer-events: none; line-height: 1;
      }
      .prot-titulo { font-size: 26px; font-weight: 800; color: #7a5c1e; margin-bottom: 20px; line-height: 1.2; }
      .prot-item { margin-bottom: 22px; }
      .prot-item-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
      .prot-item-icon {
        width: 40px; height: 40px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .prot-item-icon img { width: 40px; height: 40px; object-fit: contain; }
      .prot-item-title { font-size: 15px; font-weight: 700; color: #7a5c1e; }
      .prot-item-desc { font-size: 13px; color: #555; line-height: 1.55; margin-bottom: 6px; }
      .prot-link { font-size: 13px; color: #009a85; font-weight: 500; }
      .prot-divider { height: 1px; background: #e0d5c0; margin: 18px 0; }
      .prot-pagamentos { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
      .prot-pay-badge {
        height: 28px; padding: 0 10px; border-radius: 6px;
        border: 1px solid #ddd; background: #fff;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700; color: #333;
      }
    </style>
    <div id="modalProtecao" onclick="if(event.target===this)fecharModalProtecao()">
      <div id="modalProtecaoPainel">
        <button class="prot-close" onclick="fecharModalProtecao()">×</button>
        <div class="prot-watermark">✓</div>
        <div class="prot-titulo">Proteção<br>do cliente</div>

        <div class="prot-item">
          <div class="prot-item-header">
            <div class="prot-item-icon"><img src="/uploads/devolucao.png?v=1" style="width:40px;height:40px;object-fit:contain;"></div>
            <div class="prot-item-title">Devoluções gratuitas em 30 dias</div>
          </div>
          <p class="prot-item-desc">Devolução gratuita em até 30 dias após o recebimento do seu produto. Os Termos e Condições se aplicam.</p>
          <span class="prot-link">Saiba como solicitar um reembolso</span>
        </div>

        <div class="prot-divider"></div>

        <div class="prot-item">
          <div class="prot-item-header">
            <div class="prot-item-icon"><img src="/uploads/pagamentoseguro.png?v=1" style="width:40px;height:40px;object-fit:contain;"></div>
            <div class="prot-item-title">Pagamento seguro</div>
          </div>
          <p class="prot-item-desc">Para garantir a segurança, as informações do seu cartão são criptografadas e protegidas contra acesso não autorizado.</p>
          <p class="prot-item-desc">Não vendemos, alugamos ou cedemos suas informações pessoais a terceiros para fins de marketing.</p>
          <p class="prot-item-desc" style="margin-bottom:8px;">Aceitamos pagamento de:</p>
          <img src="/uploads/primeiralinhacartao.png?v=1" style="width:100%;max-width:340px;display:block;margin-bottom:14px;">
          <p class="prot-item-desc" style="margin-bottom:8px;">Certificações de segurança:</p>
          <img src="/uploads/segundalinha.png?v=1" style="width:190px;display:block;margin-bottom:14px;">
          <p class="prot-item-desc">Para obter informações sobre como usamos seus dados pessoais, consulte nossa <span style="color:#009a85;">Privacy Policy</span>.</p>
        </div>

        <div class="prot-divider"></div>

        <div class="prot-item">
          <div class="prot-item-header">
            <div class="prot-item-icon"><img src="/uploads/reembolso.png?v=1" style="width:40px;height:40px;object-fit:contain;"></div>
            <div class="prot-item-title">Reembolso se algo der errado</div>
          </div>
          <p class="prot-item-desc">Se o seu pedido for perdido ou danificado durante o transporte antes de chegar, reembolsaremos automaticamente o seu dinheiro. Você não precisa fazer nada.</p>
        </div>

        <div class="prot-divider"></div>

        <div class="prot-item" style="margin-bottom:0;">
          <div class="prot-item-header">
            <div class="prot-item-icon"><img src="/uploads/pedidonaoenviado.png?v=1" style="width:40px;height:40px;object-fit:contain;"></div>
            <div class="prot-item-title">Se o seu pedido não for enviado no prazo</div>
          </div>
          <p class="prot-item-desc">Você não precisa fazer nada. Se ele não for despachado em até 7 dias úteis, cancelaremos o seu pedido e reembolsaremos automaticamente o seu dinheiro.</p>
        </div>
      </div>
    </div>
    <script>
    function abrirModalProtecao() {
      var m = document.getElementById('modalProtecao');
      if (!m) return;
      m.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function fecharModalProtecao() {
      var m = document.getElementById('modalProtecao');
      if (m) m.classList.remove('show');
      document.body.style.removeProperty('overflow');
    }
    </script>
</body>
</html>