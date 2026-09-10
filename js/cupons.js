(function (global) {
  var STORAGE_KEY = 'cuponsResgatados';

  var RULES = {
    ENVIO7: { type: 'free_shipping', minSubtotal: 59 },
    DESC5: { type: 'fixed_discount', value: 5, minSubtotal: 80 }
  };

  function getResgatados() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    } catch (e) {
      return new Set();
    }
  }

  function setResgatados(set) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  }

  function marcarCupomResgatado(btn) {
    if (!btn) return;
    var label = btn.dataset.redeemedLabel || (btn.textContent === 'Usar' ? 'Usado' : 'Resgatado');
    btn.textContent = label;
    btn.disabled = true;
    btn.style.background = '#9ca3af';
    btn.style.borderColor = '#9ca3af';
    btn.style.color = '#fff';
    btn.style.cursor = 'default';
    btn.style.opacity = '0.75';
  }

  function showCupomToast(code) {
    var toast = document.createElement('div');
    toast.className = 'toast-center show';
    toast.innerHTML =
      '<div class="toast-icon success"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>' +
      '<div class="toast-text">Cupom ' + code + ' resgatado!</div>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2200);
  }

  function resgatarCupom(code, btn) {
    var resgatados = getResgatados();
    if (resgatados.has(code)) return;
    resgatados.add(code);
    setResgatados(resgatados);
    if (btn) marcarCupomResgatado(btn);
    showCupomToast(code);
    global.dispatchEvent(new CustomEvent('cupons-atualizados', { detail: { code: code } }));
  }

  function calcularCupons(subtotal) {
    var sub = Number(subtotal) || 0;
    var resgatados = getResgatados();
    var descontoCupom = 0;
    var freteGratis = false;

    if (resgatados.has('DESC5') && sub >= RULES.DESC5.minSubtotal) {
      descontoCupom = RULES.DESC5.value;
    }
    if (resgatados.has('ENVIO7') && sub >= RULES.ENVIO7.minSubtotal) {
      freteGratis = true;
    }

    return {
      descontoCupom: descontoCupom,
      freteGratis: freteGratis,
      resgatados: Array.from(resgatados)
    };
  }

  function restaurarBotoes() {
    var resgatados = getResgatados();
    document.querySelectorAll('button[data-code]').forEach(function (btn) {
      if (resgatados.has(btn.dataset.code)) marcarCupomResgatado(btn);
    });
  }

  global.resgatarCupom = resgatarCupom;
  global.Cupons = {
    RULES: RULES,
    getResgatados: getResgatados,
    calcularCupons: calcularCupons,
    restaurarBotoes: restaurarBotoes,
    resgatarCupom: resgatarCupom,
    marcarCupomResgatado: marcarCupomResgatado
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restaurarBotoes);
  } else {
    restaurarBotoes();
  }
})(window);
