// ========== SISTEMAS UTILITÃRIOS E UI ==========

// Toast reutilizÃ¡vel (mensagem flutuante)
function createToast(text) {
    const message = document.createElement('div');
    message.textContent = text;
    Object.assign(message.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#ff2d55',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        zIndex: 10000,
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'opacity 0.5s',
        opacity: '1',
    });
    // Remove toasts anteriores iguais
    const existing = document.querySelectorAll('.custom-search-toast');
    existing.forEach(n => n.parentNode && n.parentNode.removeChild(n));
    message.className = 'custom-search-toast';
    document.body.appendChild(message);
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            if (message.parentNode) message.parentNode.removeChild(message);
        }, 500);
    }, 2000);
}

// Mensagem de busca desabilitada (global)
window.showSearchDisabledMessage = function () {
    createToast('âŒ NÃ£o Ã© possÃ­vel realizar pesquisas nesta loja.');
};

// ...lÃ³gica de carrinho removida...

// Sticky tabs e navegaÃ§Ã£o de seÃ§Ãµes
var _descExpanded = false;
function toggleDescricao() {
    var el   = document.getElementById('descricao-produto-dinamica');
    var btn  = document.getElementById('desc-ver-mais');
    var fade = document.getElementById('desc-fade');
    _descExpanded = !_descExpanded;
    if (_descExpanded) {
        el.style.maxHeight = 'none';
        btn.innerHTML = 'Ver menos <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>';
        if (fade) fade.style.display = 'none';
    } else {
        el.style.maxHeight = '240px';
        el.style.overflow = 'hidden';
        btn.innerHTML = 'Ver mais <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
        if (fade) fade.style.display = 'block';
    }
}
var _tabsTop = null;
var _tabsH = 0;
function handleStickyTabs() {
    var tabs = document.getElementById('sticky-tabs');
    var sentinel = document.getElementById('tabs-sentinel');
    if (!tabs || !sentinel) return;
    if (_tabsTop === null) {
        var r = tabs.getBoundingClientRect();
        _tabsTop = r.top + window.scrollY;
        _tabsH = tabs.offsetHeight;
    }
    var isFixed = tabs.classList.contains('is-fixed');
    if (!isFixed && window.scrollY >= _tabsTop) {
        sentinel.style.height = _tabsH + 'px';
        tabs.classList.add('is-fixed');
    } else if (isFixed && window.scrollY < _tabsTop) {
        tabs.classList.remove('is-fixed');
        sentinel.style.height = '1px';
    }
}
function setupSectionObserver() {
    const sections = {
        visaoGeral: document.getElementById('visao-geral-section'),
        avaliacoes: document.getElementById('avaliacoes-section'),
        descricao: document.getElementById('descricao-produto'),
        recomendacoes: document.getElementById('recomendacoes')
    };
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                const allTabs = document.querySelectorAll('.tab');
                if (entry.target === sections.visaoGeral) allTabs[0]?.classList.add('active');
                else if (entry.target === sections.avaliacoes) allTabs[1]?.classList.add('active');
                else if (entry.target === sections.descricao) allTabs[2]?.classList.add('active');
                else if (entry.target === sections.recomendacoes) allTabs[3]?.classList.add('active');
            }
        });
    }, observerOptions);
    Object.values(sections).forEach(sec => sec && observer.observe(sec));
}
function scrollToSection(sectionId, tabIndex) {
    const section = document.getElementById(sectionId);
    if (section) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        const allTabs = document.querySelectorAll('.tab');
        allTabs[tabIndex]?.classList.add('active');
        if (allTabs[tabIndex + 3]) allTabs[tabIndex + 3].classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToVisaoGeral() { scrollToSection('visao-geral-section', 0); }
function scrollToAvaliacoes() { scrollToSection('avaliacoes-section', 1); }
function scrollToDescription() {
    const h3Elements = document.querySelectorAll('h3');
    let targetH3 = null;
    for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].textContent.trim() === 'DescriÃ§Ã£o do Produto') {
            targetH3 = h3Elements[i]; break;
        }
    }
    if (targetH3) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        const allTabs = document.querySelectorAll('.tab');
        allTabs[2]?.classList.add('active');
        targetH3.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function scrollToRecomendacoes() { scrollToSection('recomendacoes', 3); }
function showTab(tabId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    const targetSection = document.getElementById(tabId);
    if (targetSection) targetSection.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
}

// Imagem em tela cheia
let currentImageIndex = 0;
function openFullscreen(imageSrc, imageIndex) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    if (fullscreenContainer && fullscreenImage) {
        fullscreenImage.src = imageSrc;
        fullscreenContainer.style.display = 'flex';
        setTimeout(() => { fullscreenContainer.classList.add('active'); }, 10);
        if (typeof imageIndex === 'number') currentImageIndex = imageIndex;
    }
}
function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (fullscreenContainer) {
        fullscreenContainer.classList.remove('active');
        setTimeout(() => { fullscreenContainer.style.display = 'none'; }, 300);
    }
}
function changeImageInFullscreen(direction) {
    // Exemplo: use as imagens do produto carregado
    const produto = window.currentProduct || {};
    const fotos = (produto.fotos && produto.fotos.length) ? produto.fotos : [];
    if (!fotos.length) return;
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = fotos.length - 1;
    else if (currentImageIndex >= fotos.length) currentImageIndex = 0;
    const fullscreenImage = document.getElementById('fullscreen-image');
    if (fullscreenImage) fullscreenImage.src = fotos[currentImageIndex];
}

// Countdown timer (oferta relÃ¢mpago)
function startCountdown() {
    let minutes = 5, seconds = 0;
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;
    const countdownInterval = setInterval(() => {
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        timerElement.textContent = `Termina em ${formattedMinutes}:${formattedSeconds}`;
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                timerElement.textContent = 'Oferta expirada!';
                timerElement.style.color = '#999';
                return;
            }
            minutes--; seconds = 59;
        } else { seconds--; }
    }, 1000);
}

// Data de entrega dinÃ¢mica (5 dias Ãºteis)
function updateShippingDate() {
    const shippingDateElement = document.getElementById('shipping-date');
    if (!shippingDateElement) return;
    const today = new Date();
    let deliveryDate = new Date(today), daysAdded = 0;
    while (daysAdded < 5) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) daysAdded++;
    }
    const day = deliveryDate.getDate();
    const month = deliveryDate.toLocaleString('pt-BR', { month: 'short' });
    shippingDateElement.textContent = `Receba atÃ© ${day} de ${month}`;
}

// Favoritos (coraÃ§Ã£o)
let isSaved = false;
function toggleSave() {
    isSaved = !isSaved;
    const saveIcon = document.getElementById('save-icon');
    const saveButton = document.getElementById('save-button');
    if (!saveIcon || !saveButton) return;
    if (isSaved) {
        saveIcon.innerHTML = `<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#ff2d55" stroke="#ff2d55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        saveButton.style.backgroundColor = '#fff5f5';
        saveButton.style.transform = 'scale(1.1)';
        setTimeout(() => { saveButton.style.transform = 'scale(1)'; }, 200);
    } else {
        saveIcon.innerHTML = `<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        saveButton.style.backgroundColor = 'transparent';
    }
}

// BotÃ£o voltar ao topo
function toggleBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    backToTopButton.style.display = (scrollPosition + windowHeight >= documentHeight - 100) ? 'flex' : 'none';
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// InicializaÃ§Ã£o Ãºnica ao carregar a pÃ¡gina
document.addEventListener('DOMContentLoaded', function () {
    // Toast de busca (se existir botÃ£o)
    const btn = document.getElementById('search-btn');
    if (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.showSearchDisabledMessage();
        });
    }
    // sticky tabs via scroll event (handleStickyTabs)
    // BotÃ£o voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) backToTopButton.addEventListener('click', scrollToTop);
    // Inicializa sistemas
    setupSectionObserver();
    startCountdown();
    updateShippingDate();
    handleStickyTabs();
    toggleBackToTop();
    // ...lÃ³gica de carrinho removida...
    window.addEventListener('scroll', handleStickyTabs, { passive: true });
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
});
// ...lÃ³gica de carrinho removida...
window.scrollToVisaoGeral = scrollToVisaoGeral;
window.scrollToAvaliacoes = scrollToAvaliacoes;
window.scrollToDescription = scrollToDescription;
window.scrollToRecomendacoes = scrollToRecomendacoes;
window.showTab = showTab;
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
window.changeImageInFullscreen = changeImageInFullscreen;
window.toggleSave = toggleSave;
window.scrollToTop = scrollToTop;

(async function loadProductFromJson() {
    try {
        const resp = await fetch('./produtos.json');
        if (!resp.ok) return;
        const data = await resp.json();
        if (!data) return;
        let produto = null;
        const params = new URLSearchParams(window.location.search);
        const produtoId = params.get('produto_id') || params.get('id') || null;
        if (produtoId) {
            produto = data.find(p => String(p.id) === String(produtoId));
        }
        if (!produto && Array.isArray(data) && data.length) produto = data[0];
        if (!produto) return;

        // Title
        const titleEl = document.getElementById('product-title');
        if (titleEl && produto.titulo) {
              titleEl.textContent = produto.titulo;
        }

        // Images - carrossel dinÃ¢mico
        const FALLBACK_IMAGE = 'https://via.placeholder.com/600x600.png?text=Produto';
        let fotos = Array.isArray(produto.fotos) && produto.fotos.length ? produto.fotos.filter(Boolean) : [];
        let currentImgIdx = 0;
        const mainImg = document.getElementById('main-product-image');
        const imageCounter = document.getElementById('image-counter');
        const imageDots = document.getElementById('image-dots');
        const imageThumbs = document.getElementById('image-thumbnails');
        const loading = document.getElementById('image-loading');
        const prevBtn = document.getElementById('img-prev-btn');
        const nextBtn = document.getElementById('img-next-btn');
        let scanStarted = false;

        function filterBrokenImages(list) {
            if (!Array.isArray(list) || !list.length) return Promise.resolve([]);
            const snapshot = list.slice();
            return new Promise((resolve) => {
                let remaining = snapshot.length;
                const keep = new Array(snapshot.length).fill(false);
                const done = new Array(snapshot.length).fill(false);
                const timeoutMs = 7000;
                const finish = (idx, ok) => {
                    if (done[idx]) return;
                    done[idx] = true;
                    keep[idx] = ok;
                    remaining -= 1;
                    if (remaining <= 0) {
                        resolve(snapshot.filter((_, i) => keep[i]));
                    }
                };
                snapshot.forEach((src, idx) => {
                    const img = new Image();
                    const timer = window.setTimeout(() => finish(idx, false), timeoutMs);
                    img.onload = () => {
                        window.clearTimeout(timer);
                        finish(idx, true);
                    };
                    img.onerror = () => {
                        window.clearTimeout(timer);
                        finish(idx, false);
                    };
                    img.src = src;
                });
            });
        }

        function scanImagesOnce() {
            if (scanStarted) return;
            scanStarted = true;
            if (!Array.isArray(fotos) || fotos.length < 2) return;
            const snapshot = fotos.slice();
            filterBrokenImages(snapshot).then((valid) => {
                if (!Array.isArray(valid) || valid.length === 0) {
                    if (fotos.length) {
                        fotos = [];
                        currentImgIdx = 0;
                        showImage(0);
                    }
                    return;
                }
                const validSet = new Set(valid.map((src) => String(src).toLowerCase()));
                const nextList = fotos.filter((src) => validSet.has(String(src).toLowerCase()));
                if (!nextList.length) {
                    fotos = [];
                    currentImgIdx = 0;
                    showImage(0);
                    return;
                }
                if (nextList.length !== fotos.length) {
                    const currentSrc = fotos[currentImgIdx];
                    fotos = nextList;
                    const nextIdx = currentSrc ? fotos.indexOf(currentSrc) : -1;
                    currentImgIdx = nextIdx >= 0 ? nextIdx : Math.min(currentImgIdx, fotos.length - 1);
                    showImage(currentImgIdx);
                }
            });
        }

        function showImage(idx) {
    // Adiciona suporte a swipe/touch no mobile (apenas uma vez)
    if (!window._carouselSwipeBound) {
        const imageContainer = document.querySelector('.image-container');
        if (imageContainer) {
            let touchStartX = 0;
            let touchEndX = 0;
            let touchMoved = false;
            imageContainer.addEventListener('touchstart', function (e) {
                if (e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchMoved = false;
                }
            });
            imageContainer.addEventListener('touchmove', function (e) {
                if (e.touches.length === 1) {
                    touchEndX = e.touches[0].clientX;
                    touchMoved = true;
                }
            });
            imageContainer.addEventListener('touchend', function (e) {
                if (!touchMoved) return;
                const deltaX = touchEndX - touchStartX;
                if (Math.abs(deltaX) > 40) {
                    if (deltaX < 0) {
                        // Swipe left: prÃ³xima imagem
                        showImage(currentImgIdx + 1);
                    } else if (deltaX > 0) {
                        // Swipe right: imagem anterior
                        showImage(currentImgIdx - 1);
                    }
                }
            });
        }
        window._carouselSwipeBound = true;
    }
            if (!fotos.length) {
                if (mainImg) {
                    mainImg.style.display = '';
                    mainImg.src = FALLBACK_IMAGE;
                }
                if (loading) loading.classList.remove('show');
                if (imageCounter) imageCounter.textContent = '0/0';
                if (imageDots) imageDots.innerHTML = '';
                if (imageThumbs) imageThumbs.innerHTML = '';
                return;
            }
            currentImgIdx = ((idx % fotos.length) + fotos.length) % fotos.length;
            if (mainImg) {
                mainImg.style.display = 'none';
                loading.classList.add('show');
                mainImg.src = fotos[currentImgIdx];
                mainImg.onload = () => {
                    mainImg.style.display = '';
                    loading.classList.remove('show');
                };
                mainImg.onerror = () => {
                    const brokenSrc = fotos[currentImgIdx];
                    if (brokenSrc && Array.isArray(fotos)) {
                        fotos.splice(currentImgIdx, 1);
                    }
                    if (!fotos.length) {
                        mainImg.src = FALLBACK_IMAGE;
                        mainImg.style.display = '';
                        if (loading) loading.classList.remove('show');
                        if (imageCounter) imageCounter.textContent = '0/0';
                        if (imageDots) imageDots.innerHTML = '';
                        if (imageThumbs) imageThumbs.innerHTML = '';
                        return;
                    }
                    showImage(currentImgIdx);
                };
            }
            if (imageCounter) imageCounter.textContent = `${currentImgIdx + 1}/${fotos.length}`;
            if (imageDots) {
                imageDots.innerHTML = '';
                fotos.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = 'dot' + (i === currentImgIdx ? ' active' : '');
                    dot.onclick = () => showImage(i);
                    imageDots.appendChild(dot);
                });
            }
            if (imageThumbs) {
                imageThumbs.innerHTML = '';
                fotos.forEach((f, i) => {
                    const t = document.createElement('img');
                    t.src = f;
                    t.className = 'thumbnail' + (i === currentImgIdx ? ' active' : '');
                    t.style.width = '38px';
                    t.style.height = '38px';
                    t.style.objectFit = 'cover';
                    t.style.marginRight = '4px';
                    t.style.borderRadius = '8px';
                    t.style.border = i === currentImgIdx ? '2px solid #ff2d55' : '1px solid #eee';
                    t.onclick = () => showImage(i);
                    t.onerror = function () { t.src = 'https://via.placeholder.com/32x32?text=Img'; };
                    imageThumbs.appendChild(t);
                });
            }
        }
        if (prevBtn) prevBtn.onclick = () => showImage(currentImgIdx - 1);
        if (nextBtn) nextBtn.onclick = () => showImage(currentImgIdx + 1);
        showImage(0);
        scanImagesOnce();

        // ...restante do cÃ³digo existente...
        // Prices
        const priceCurrent = document.getElementById('price-current');
        if (priceCurrent) priceCurrent.textContent = formatCurrency(produto.preco);
        const priceCompare = document.getElementById('price-compare');
        if (priceCompare) {
            if (produto.preco_comparacao && Number(produto.preco_comparacao) > Number(produto.preco)) {
                priceCompare.style.display = 'inline-block';
                priceCompare.textContent = formatCurrency(produto.preco_comparacao);
            } else {
                priceCompare.style.display = 'none';
            }
        }
        const discount = document.getElementById('discount-percent');
        if (discount) {
            if (produto.desconto) {
                discount.style.display = 'inline-block';
                discount.textContent = (produto.desconto ? ('-' + produto.desconto + '%') : '');
            } else {
                discount.style.display = 'none';
            }
        }

        // Frete e Entrega (prazo dinÃ¢mico)
        const shippingDate = document.getElementById('shipping-date');
        const shippingFee = document.getElementById('shipping-fee');
        if (shippingDate) {
            // Prazo dinÃ¢mico: exibe "Receba atÃ© X de mÃªs" com base na data de acesso
            let prazo = 7; // padrÃ£o 7 dias
            if (produto.entrega && !isNaN(Number(produto.entrega))) prazo = Number(produto.entrega);
            const hoje = new Date();
            const dataFinal = new Date(hoje.getTime() + prazo * 24 * 60 * 60 * 1000);
            const dia = dataFinal.getDate().toString().padStart(2, '0');
            const mes = (dataFinal.getMonth() + 1).toString().padStart(2, '0');
            shippingDate.textContent = produto.frete ? produto.frete : `Receba atÃ© ${dia}/${mes}`;
        }
        if (shippingFee) shippingFee.textContent = '';

        // Garantia
        const garantiaInfo = document.getElementById('garantia-produto');
        if (garantiaInfo) garantiaInfo.innerHTML = produto.garantia || 'Garantia de satisfação';

        // DescriÃ§Ã£o, EspecificaÃ§Ãµes, Diferenciais
        const descDinamica = document.getElementById('descricao-produto-dinamica');
        if (descDinamica) {
            descDinamica.innerHTML = produto.descricao || '';
            // init collapsible
            (function() {
                var fade = document.getElementById('desc-fade');
                var btn  = document.getElementById('desc-ver-mais');
                if (!btn) return;
                if (descDinamica.scrollHeight <= 244) {
                    descDinamica.style.maxHeight = 'none';
                    if (fade) fade.style.display = 'none';
                    btn.style.display = 'none';
                }
            })();
        }
        const especificacoes = document.getElementById('especificacoes-produto');
        if (especificacoes) especificacoes.innerHTML = (produto.especificacoes || '').replace(/\n/g, '<br>');
        const diferenciais = document.getElementById('diferenciais-produto');
        if (diferenciais) diferenciais.innerHTML = (produto.diferenciais || '').replace(/\n/g, '<br>');

        // Oferta relÃ¢mpago (timer)
        const countdown = document.getElementById('countdown-timer');
        if (countdown && produto.oferta_termina_em) {
            function atualizarTimer() {
                const agora = new Date();
                const fim = new Date(produto.oferta_termina_em);
                let diff = Math.floor((fim.getTime() - agora.getTime()) / 1000);
                if (diff < 0) diff = 0;
                const h = Math.floor(diff / 3600).toString().padStart(2, '0');
                const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
                const s = (diff % 60).toString().padStart(2, '0');
                countdown.textContent = `Termina em ${h}:${m}:${s}`;
            }
            atualizarTimer();
            setInterval(atualizarTimer, 1000);
        }

        // Rating
        const ratingText = document.getElementById('rating-text');
        if (ratingText) {
            const comentariosCount = produto.comentarios ? produto.comentarios.length : 0;
            const vendidos = produto.quantidade_produtos || 0;
            const notas = produto.notas ? Number(produto.notas) : (comentariosCount ? (produto.comentarios.reduce((s, c) => s + Number(c.nota || 0), 0) / comentariosCount) : 0);
            ratingText.textContent = `${notas ? notas.toFixed(1) : ''} (${comentariosCount}) ${vendidos} vendidos`;
        }

        // Description â€” handled above via #descricao-produto-dinamica

        // Buy link â€” agora abre o modal de variaÃ§Ãµes em vez de ir direto para o checkout
        const buyBtn = document.getElementById('buy-now-btn');
        if (buyBtn) {
            buyBtn.setAttribute('href', 'javascript:void(0);');
            buyBtn.onclick = (e) => {
                e.preventDefault();
                // Sempre usa o produto carregado do JSON
                window.modalProdutoAtual = produto;
                if (typeof abrirModalProduto === 'function') {
                    abrirModalProduto(produto);
                } else {
                    try { addToCart({ id: produto.id, name: produto.titulo, price: Number(produto.preco), image: (produto.fotos && produto.fotos[0]) || '' }, false); } catch (err) { console.error(err); }
                }
            };
        }

        // expose currentProduct for existing cart code
        window.currentProduct = {
            id: produto.id,
            name: produto.titulo,
            price: Number(produto.preco),
            image: (produto.fotos && produto.fotos[0]) || ''
        };

        // Backwards compatibility: some pages use produtoSelecionado
        window.produtoSelecionado = window.produtoSelecionado || window.currentProduct;

        // wire add-to-cart button
        const addBtn = document.getElementById('add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function () {
                try { addToCart(window.currentProduct, false); } catch (e) { console.error(e); }
            });
        }

    } catch (err) {
        console.error('Erro ao carregar produtos.json', err);
    }

    function formatCurrency(value) {
        try { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0)); }
        catch (e) { return 'R$ ' + (Number(value || 0).toFixed(2)); }
    }
})();


// Garante fallback da logo da loja (ASICS)
(function ensureStoreLogo() {
    try {
        var logoEl = document.getElementById('store-logo');
        if (!logoEl) return;
        var fallback = logoEl.getAttribute('data-default-logo') || '/uploads/asics-logo.jpg';
        logoEl.onerror = function () {
            logoEl.onerror = null;
            logoEl.src = fallback;
        };
        if (!logoEl.getAttribute('src')) logoEl.src = fallback;
    } catch (e) {
        console.warn('ensureStoreLogo error', e);
    }


            function handleOpenShareSection() {
            const shareSection = document.getElementById('share-section');
            const shareOverlay = document.getElementById('share-overlay');
            if (shareSection && shareOverlay) {
                shareOverlay.style.display = 'block';
                shareSection.style.display = 'block';

                // Prevent touch events from propagating
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';

                setTimeout(() => {
                    shareOverlay.classList.add('active');
                    shareSection.classList.add('active');
                }, 10);
            }
        }

        function handleOpenComplaintSection() {
            const complaintSection = document.getElementById('complaint-section');
            const complaintOverlay = document.getElementById('complaint-overlay');
            if (complaintSection && complaintOverlay) {
                complaintOverlay.style.display = 'block';
                complaintSection.style.display = 'block';

                // Prevent touch events from propagating
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';

                setTimeout(() => {
                    complaintOverlay.classList.add('active');
                    complaintSection.classList.add('active');
                }, 10);
            }
        }

        function closeShareSection() {
            const shareSection = document.getElementById('share-section');
            const shareOverlay = document.getElementById('share-overlay');
            if (shareSection && shareOverlay) {
                shareOverlay.classList.remove('active');
                shareSection.classList.remove('active');

                setTimeout(() => {
                    shareOverlay.style.display = 'none';
                    shareSection.style.display = 'none';
                }, 300);

                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            }
        }

        function closeComplaintSection() {
            const complaintSection = document.getElementById('complaint-section');
            const complaintOverlay = document.getElementById('complaint-overlay');
            if (complaintSection && complaintOverlay) {
                complaintOverlay.classList.remove('active');
                complaintSection.classList.remove('active');

                setTimeout(() => {
                    complaintOverlay.style.display = 'none';
                    complaintSection.style.display = 'none';
                }, 300);

                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            }
        }

        async function copyLink(e) {
            try {
                await navigator.clipboard.writeText(window.location.href);
                // Encontra o label do item clicado, se existir
                let container = e && (e.currentTarget || (e.target && e.target.closest && e.target.closest('.share-option')));
                const labelEl = container ? container.querySelector('.share-label') : document.getElementById('copy-link-btn');
                if (labelEl) {
                    const originalText = labelEl.textContent;
                    labelEl.textContent = 'Link copiado!';
                    setTimeout(() => {
                        labelEl.textContent = originalText;
                    }, 1500);
                }
            } catch (err) {
                // Fallback para navegadores mais antigos
                const tempInput = document.createElement('input');
                const url = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.value = url;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('Link copiado para a Ã¡rea de transferÃªncia!');
            }
            // Fecha com animaÃ§Ã£o suave
            closeShareSection();
        }

        const seguirBtnEl = document.getElementById('seguirBtn');
        if (seguirBtnEl) {
            seguirBtnEl.addEventListener('click', () => {
                seguirBtnEl.textContent = 'Seguindo';
            });
        }


        document.addEventListener('DOMContentLoaded', function () {
            // InicializaÃ§Ã£o do modal de tela cheia (se existir)
            const fullscreenContainer = document.getElementById('fullscreen-container');
            const fullscreenClose = document.getElementById('fullscreen-close');

            if (fullscreenClose && fullscreenContainer) {
                fullscreenClose.addEventListener('click', closeFullscreen);
                fullscreenContainer.addEventListener('click', (e) => {
                    if (e.target === fullscreenContainer) {
                        closeFullscreen();
                    }
                });
            }
        });
})();