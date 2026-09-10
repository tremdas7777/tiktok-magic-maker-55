(function () {
  'use strict';

  var ZG_HOST = window.location.protocol + '//' + window.location.host;
  var SS_CID = '_zg_cid';
  var SS_JT  = '_zg_jt';

  function getParam(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ''; } catch (e) { return ''; }
  }
  function ss(key, val) {
    try { if (val) sessionStorage.setItem(key, val); } catch (e) {}
  }
  function sg(key) {
    try { return sessionStorage.getItem(key) || ''; } catch (e) { return ''; }
  }

  var clickid = getParam('ttclid') || getParam('clickid') || getParam('cck') || sg(SS_CID);
  var jt      = getParam('jt') || sg(SS_JT);

  ss(SS_CID, clickid);
  ss(SS_JT,  jt);

  // event_id consistente: mesmo valor no browser e no servidor → TikTok deduplica automaticamente
  function makeEventId(evName) {
    return clickid + '_' + (evName || 'Lead').toLowerCase();
  }

  window.zgTrack = function (event, value, eventId) {
    if (!clickid) return;
    var eid = eventId || makeEventId(event);
    var url = ZG_HOST + '/services/zero-gate/event.php'
      + '?clickid=' + encodeURIComponent(clickid)
      + '&event='   + encodeURIComponent(event  || 'Lead')
      + '&value='   + encodeURIComponent(value  || 0)
      + '&eid='     + encodeURIComponent(eid)
      + (jt ? '&jt=' + encodeURIComponent(jt) : '');
    if (navigator.sendBeacon) { navigator.sendBeacon(url); }
    else { (new Image()).src = url; }
  };

  // ── Intercepta ttqFire automaticamente ────────────────────────
  // Gera o mesmo event_id que será mandado ao servidor — TikTok deduplica
  // se browser e servidor enviarem o mesmo event_id dentro de 48h.
  var _ttqOrig = null;
  var _ttqWrapped = null;
  try {
    Object.defineProperty(window, 'ttqFire', {
      configurable: true,
      enumerable:   true,
      set: function (fn) {
        _ttqOrig = fn;
        _ttqWrapped = function (name, payload) {
          if (window.RABBITFY_GATEWAY_DIVERTED === true) {
            fn.apply(this, arguments);
            return;
          }
          var val = (payload && typeof payload.value === 'number') ? payload.value : 0;
          var eid = (payload && payload.event_id) ? payload.event_id : makeEventId(name);
          // Passa event_id pro pixel do browser também (deduplicação)
          var augmented = Object.assign({}, payload || {}, { eventID: eid });
          fn.call(this, name, augmented);
          window.zgTrack(name, val, eid);
        };
      },
      get: function () { return _ttqWrapped; }
    });
  } catch (e) {}

  window.zgTrack('PageView');

}());
